import Screen from '../view/Screen';
import Lotto from '../model/Lotto';
import generateLottoNumbers from '../utils/LottoUtil';
import { MONEY_UNIT, MIN_NUMBER, MAX_NUMBER, LOTTO_LENGTH } from '../Constants';

class LottoGame {
  #lottos = [];
  #count;

  async start() {
    await this.#inputPurchaseCount();

    this.#issueLottos();
  }

  async #inputPurchaseCount() {
    try {
      this.#count = (await Screen.inputPurchaseMoney()) / MONEY_UNIT;
    } catch ({ message }) {
      Screen.printErrorMessage(message);
      await this.#inputPurchaseCount();
    }
  }

  async #issueLottos() {
    while (this.#count) {
      this.#lottos.push(
        new Lotto(generateLottoNumbers(MIN_NUMBER, MAX_NUMBER, LOTTO_LENGTH)),
      );
      this.#count -= 1;
    }
  }
}

export default LottoGame;
