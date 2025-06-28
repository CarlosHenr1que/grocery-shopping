import * as S from './styles';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';

export interface Props {
  active: boolean;
  text: string;
  onClick: () => void;
}

export const Selection = ({ active = false, text, onClick }: Props) => {
  return (
    <S.Container $active={active} onClick={onClick}>
      {text}
      {active ? (
        <MdKeyboardArrowUp data-testid="arrow-up" />
      ) : (
        <MdKeyboardArrowDown data-testid="arrow-down" />
      )}
    </S.Container>
  );
};
