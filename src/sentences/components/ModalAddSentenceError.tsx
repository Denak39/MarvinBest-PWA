import type { ModalAddSentenceErrorProps } from '@sentences/types';
import IconCross from '@shared/Icons/components/IconCross';
import Modal from '@shared/Modal/Modal';

/**
 * ModalAddSentenceError component.
 *
 * @param {ModalAddSentenceErrorProps} props Props
 * @return {JSX.Element}
 */
function ModalAddSentenceError(props: ModalAddSentenceErrorProps): JSX.Element {
  return (
    <Modal icon={IconCross} title="Oups..." data-testid="ModalAddSentenceError" {...props}>
      <p>
        Une erreur est survenue !
        <br /> La phrase n&apos;a pas pu être ajoutée.
      </p>
    </Modal>
  );
}

export default ModalAddSentenceError;
