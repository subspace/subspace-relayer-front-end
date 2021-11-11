import { ApiPromise } from "@polkadot/api";
import { Logger } from "pino";
import { Hash } from "@polkadot/types/interfaces";
import { U64 } from "@polkadot/types/primitive";

import { SignerWithAddress, TxBlock, ChainName } from "./types";

interface TargetConstructorParams {
  api: ApiPromise;
  logger: Logger;
  targetChainUrl: string;
}

class Target {
  public readonly api: ApiPromise;
  public readonly targetChainUrl: string;
  private readonly logger: Logger;
  // TODO: Temporary workaround before node switches to inherents for root block extrinsics: https://github.com/subspace/subspace/issues/127
  private promiseChain = Promise.resolve();

  constructor({ api, logger, targetChainUrl }: TargetConstructorParams) {
    this.api = api;
    this.logger = logger;
    this.targetChainUrl = targetChainUrl;
  }

  public sendBlockTx(
    feedId: U64,
    chainName: ChainName,
    signer: SignerWithAddress,
    { block, metadata }: TxBlock,
    nonce: bigint,
  ): Promise<Hash> {
    this.logger.debug(`Sending ${chainName} block to feed ${feedId}`);
    this.logger.debug(`Signer: ${signer.address}`);

    const promiseFn = () => new Promise<Hash>((resolve, reject) => {
      let unsub: () => void;
      this.api.tx.feeds
        .put(
          feedId,
          `0x${block.toString('hex')}`,
          `0x${metadata.toString('hex')}`,
        )
        .signAndSend(signer.address, { nonce, signer }, (result) => {
          if (result.isError) {
            reject(new Error(result.status.toString()));
            unsub();
          } else if (result.status.isInBlock) {
            resolve(result.status.asInBlock);
            unsub();
          }
        })
        .then((unsubLocal) => {
          unsub = unsubLocal;
        })
        .catch((e) => {
          reject(e);
        });
    });

    const promise = this.promiseChain.then(promiseFn);
    this.promiseChain = promise
      .then(() => undefined)
      .catch(() => {
        // We don't want to break the chain here even when promise gets rejected
      });

    return promise;
  }

  public sendBlocksBatchTx(
    feedId: U64,
    chainName: ChainName,
    signer: SignerWithAddress,
    txData: TxBlock[],
    nonce: bigint,
  ): Promise<Hash> {
    this.logger.debug(`Sending ${txData.length} ${chainName} blocks to feed ${feedId}`);
    this.logger.debug(`Signer: ${signer.address}`);

    const putCalls = txData.map(({ block, metadata }: TxBlock) => {
      return this.api.tx.feeds.put(
        feedId,
        `0x${block.toString('hex')}`,
        `0x${metadata.toString('hex')}`,
      );
    });

    const promiseFn = () => new Promise<Hash>((resolve, reject) => {
      let unsub: () => void;
      this.api.tx.utility
        .batchAll(putCalls)
        .signAndSend(signer.address, { nonce, signer }, (result) => {
          if (result.isError) {
            reject(new Error(result.status.toString()));
            unsub();
          } else if (result.status.isInBlock) {
            resolve(result.status.asInBlock);
            unsub();
          }
        })
        .then((unsubLocal) => {
          unsub = unsubLocal;
        })
        .catch((e) => {
          reject(e);
        });
    });

    const promise = this.promiseChain.then(promiseFn);
    this.promiseChain = promise
      .then(() => undefined)
      .catch(() => {
        // We don't want to break the chain here even when promise gets rejected
      });

    return promise;
  }
}

export default Target;
