import * as S from './styles';
import { MdMenu } from 'react-icons/md';

export const Header = () => {
  return (
    <S.Container>
      <MdMenu size={30} color="#fff" />
      <h1 style={{ color: '#fff' }}>Header</h1>
    </S.Container>
  );
};
