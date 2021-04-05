import React, { useCallback, useState } from 'react';

export default function useFormWithValidation () {
    const [value, setValue] = useState('');
    const [isValid, setIsValid ] = useState(false);
    const [isDirty, setIsDirty] = useState(false);
    const [isError, setIsError] = useState('');
    const onChange = useCallback((event, setErrorRequest) => {
        if (event.target.value === '') {
            setIsDirty(false);
        }

        setValue(event.target.value);
        setIsValid(event.target.validity.valid);
        setIsError(event.target.validationMessage);

        setErrorRequest(false);
    }, []);

    return { value, isValid, isError, isDirty, setValue, setIsValid, setIsDirty, onChange };
}