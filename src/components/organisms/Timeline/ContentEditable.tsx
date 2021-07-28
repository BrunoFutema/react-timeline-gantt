/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, {
  ChangeEvent,
  KeyboardEvent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

interface IContentEditableProps {
  index: number;
  value: string;
  onChange?: (value: string) => void;
}

const ContentEditable: React.FC<IContentEditableProps> = ({
  index,
  value,
  onChange,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const [valueState, setValueState] = useState(value);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [editing]);

  const handleFocus = useCallback(() => setEditing(true), []);

  const handleFinishEditing = useCallback(() => {
    setEditing(false);
    if (onChange) onChange(valueState);
  }, [valueState, onChange]);

  const handleBlur = useCallback(
    () => handleFinishEditing(),
    [handleFinishEditing],
  );

  const handleKey = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      const keyCode = e.keyCode || e.which;

      if (keyCode === 13) handleFinishEditing();
    },
    [handleFinishEditing],
  );

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setValueState(e.target.value);
  }, []);

  const handleRenderDiv = useCallback(() => {
    return (
      <div
        tabIndex={index}
        onClick={handleFocus}
        onFocus={handleFocus}
        style={{ width: '100%' }}
      >
        {' '}
        {valueState}
      </div>
    );
  }, [handleFocus, index, valueState]);

  const handleRenderEditor = useCallback(() => {
    return (
      <input
        ref={inputRef}
        onBlur={handleBlur}
        style={{ width: '100%', outlineColor: 'black', outlineStyle: 'oinset' }}
        type="text"
        name="name"
        value={valueState}
        onKeyUp={handleKey}
        onChange={handleChange}
      />
    );
  }, [valueState, handleBlur, handleKey, handleChange]);

  return editing ? handleRenderEditor() : handleRenderDiv();
};

export { ContentEditable };
