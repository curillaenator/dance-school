import React, { forwardRef } from 'react';
import { IMaskInput } from 'react-imask';

interface TelMaskedProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const MaskedTelephone = forwardRef<HTMLElement, TelMaskedProps>((props, ref) => {
  const { onChange, name, ...rest } = props;

  return (
    <IMaskInput
      {...rest}
      name={name}
      mask='+7 (#00) 000-00-00'
      definitions={{ '#': /[1-9]/ }}
      // @ts-expect-error description
      inputRef={ref}
      onAccept={(value: unknown) =>
        onChange({
          target: {
            name,
            value: value as string,
          },
        })
      }
      overwrite
    />
  );
});

MaskedTelephone.displayName = 'MaskedTelephone';
