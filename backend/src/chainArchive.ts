import { u8aToHex } from '@polkadot/util';
import { blake2AsU8a } from '@polkadot/util-crypto';
import * as fsp from "fs/promises";
// TODO: Types do not seem to match the code, hence usage of it like this
// eslint-disable-next-line @typescript-eslint/no-var-requires
const levelup = require("levelup");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const rocksdb = require("rocksdb");
import { U64 } from "@polkadot/types/primitive";
import { AddressOrPair } from "@polkadot/api/submittable/types";
import { Logger } from "pino";
import { TypeRegistry } from '@polkadot/types';

import { getHeaderLength, toBlockTxData } from './utils';
import { TxData, ChainName } from "./types";
import State from './state';

interface ChainArchiveConstructorParams {
  path: string;
  chain: ChainName;
  feedId: U64;
  logger: Logger;
  signer: AddressOrPair;
  state: State;
}

class ChainArchive {
  // There are no TS types for `db` :(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private readonly db: any;
  private readonly path: string;
  private readonly chain: ChainName;
  private readonly feedId: U64;
  private readonly logger: Logger;
  private readonly state: State;
  // use TypeRegistry to create types Header and Hash instead of using polkadot.js WS API
  private readonly registry: TypeRegistry;
  public readonly signer: AddressOrPair;

  public constructor(params: ChainArchiveConstructorParams) {
    this.db = levelup(rocksdb(`${params.path}/db`));
    this.path = params.path;
    this.chain = params.chain;
    this.feedId = params.feedId;
    this.logger = params.logger;
    this.signer = params.signer;
    this.state = params.state;
    this.getBlockByNumber = this.getBlockByNumber.bind(this);
    this.isPayloadWithinSizeLimit = this.isPayloadWithinSizeLimit.bind(this);
    this.registry = new TypeRegistry();
  }

  private getBlockByNumber(blockNumber: number): Promise<Uint8Array> {
    const blockNumberBytes = Buffer.from(BigUint64Array.of(BigInt(blockNumber)).buffer);
    return this.db.get(blockNumberBytes);
  }

  private async getLastBlockNumberFromDb(): Promise<number> {
    const file = await fsp.readFile(`${this.path}/last-downloaded-block`, 'utf8');
    return parseInt(file, 10);
  }

  async *getBlocks(): AsyncGenerator<TxData, void> {
    this.logger.info('Start processing blocks from archive');

    const lastFromDb = await this.getLastBlockNumberFromDb();
    const lastProcessedString = await this.state.getLastProcessedBlockByName(this.chain);
    let lastProcessed = lastProcessedString ? parseInt(lastProcessedString, 10) : 0;

    while (lastProcessed <= lastFromDb) {
      const number = lastProcessed + 1;
      const blockBytes = await this.getBlockByNumber(number);
      const block = u8aToHex(blockBytes);
      // get block hash by hashing block header (using Blake2) instead of requesting from RPC API
      const headerLength = getHeaderLength(blockBytes);
      const hash = this.registry.createType("Hash", blake2AsU8a(blockBytes.subarray(0, headerLength)));

      const data = toBlockTxData({
        block,
        number,
        hash,
        feedId: this.feedId,
        chain: this.chain,
        signer: this.signer
      })

      lastProcessed = number;

      // TODO: consider saving last processed block after transaction is sent (move to Target)
      this.state.saveLastProcessedBlock(this.chain, number);

      if (this.isPayloadWithinSizeLimit(data)) {
        yield data;
      } else {
        this.logger.error(`${data.chain}:${number} tx payload size exceeds 5 MB`);
        process.exit(1);
      }
    }
  }

  // TODO: use same check as in node runtime
  // check if block tx payload does not exceed 5 MB size limit
  // reference https://github.com/paritytech/substrate/issues/3174#issuecomment-514539336, values above and below were tested as well
  private isPayloadWithinSizeLimit(txPayload: TxData): boolean {
    const txPayloadSize = Buffer.byteLength(JSON.stringify(txPayload));
    const txSizeLimit = 5000000; // 5 MB
    this.logger.debug(`${txPayload.chain}:${txPayload.metadata.number} tx payload size: ${txPayloadSize}`);

    return txPayloadSize <= txSizeLimit;
  }
}

export default ChainArchive;