import * as S from './styles';
import { MdSearch } from 'react-icons/md';

interface Props {
  placeholder: string;
}

export const Input = ({ placeholder }: Props) => {
  return (
    <S.Container data-testid="input-container">
      <input type="text" placeholder={placeholder} />
      <MdSearch size={22} color="9E9E9E" data-testid="input-search-icon" />
    </S.Container>
  );
};
