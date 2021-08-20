import useTranslation from 'next-translate/useTranslation';

type SizeInfoOptionsType = {
  tableClass?: string,
}

export default function SizeInfo({ tableClass }: SizeInfoOptionsType) {
  const { t } = useTranslation('product');

  return (
    <div className="maxWidth">
      <table className={tableClass}>
        <thead>
          <tr>
            <th>XS</th>
            <th>S</th>
            <th>M</th>
            <th>ML</th>
            <th>L</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{t('Bust')}: 84cm</td>
            <td>{t('Bust')}: 88cm</td>
            <td>{t('Bust')}: 92cm</td>
            <td>{t('Bust')}: 96cm</td>
            <td>{t('Bust')}: 100cm</td>
          </tr>
          <tr>
            <td>{t('Waist')}: 66cm</td>
            <td>{t('Waist')}: 70cm</td>
            <td>{t('Waist')}: 74cm</td>
            <td>{t('Waist')}: 78cm</td>
            <td>{t('Waist')}: 82cm</td>
          </tr>
          <tr>
            <td>{t('Hip')}: 90cm</td>
            <td>{t('Hip')}: 94cm</td>
            <td>{t('Hip')}: 98cm</td>
            <td>{t('Hip')}: 102cm</td>
            <td>{t('Hip')}: 106cm</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
