
export const getDoviz = async woeid => {
  const response = await fetch(
    `https://dovizkurlari-l6vtviaacq-uc.a.run.app/api/doviz/${woeid}`,
  );
  const { BanknoteBuying, BanknoteSelling, isim } = await response.json();

  return {
    alis: BanknoteBuying,
    satis: BanknoteSelling,
    isim:isim,
  };
};
