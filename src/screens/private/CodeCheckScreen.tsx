import React, { useRef, useState } from 'react';
import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { Input } from "../../components/Input";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Text } from "../../components/Typography";
import { useTheme } from "styled-components/native";


export default function CodeCheckScreen() {
  const theme = useTheme();

  const numberOfInputs = 4;
  const [code, setCode] = useState(new Array(numberOfInputs).fill(''));
  const inputsRef = useRef([]);

  const handleChange = (text, index) => {
    if (/^\d$/.test(text)) { // Apenas 1 dígito numérico
      const newCode = [...code];
      newCode[index] = text;
      setCode(newCode);

      // Move o foco para o próximo campo
      if (index < numberOfInputs - 1) {
        inputsRef.current[index + 1].focus();
      }
    } else if (text === '') {
      const newCode = [...code];
      newCode[index] = '';
      setCode(newCode);
    }
  };

  const handleKeyPress = ({ nativeEvent }, index) => {
    if (nativeEvent.key === 'Backspace' && code[index] === '' && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <ContainerDefault justifyContent='center' alignItems='center'>
        <CustomContainer>
          <Text fontSize="h4" fontFamily="bold" textAlign='right' marginBottom={56}>Digite o código de 4 dígitos enviado em seu email</Text>
          <CustomContainer flexDirection='row' justifyContent='center' gap={16}>
             {code.map((digit, index) => (
              <Input
                key={index}
                keyboardType="number-pad"
                maxLength={1}
                width={48}
                backgroundColor='transparent'
                borderSize={1}
                borderRadius='md'
                textAlignVertical='center'
                textAlign='center'
                borderColor='text'
                value={digit}
                onChangeText={text => handleChange(text, index)}
                onKeyPress={e => handleKeyPress(e, index)}
                ref={el => inputsRef.current[index] = el}
              />
            ))}
          </CustomContainer>
       </CustomContainer>
    </ContainerDefault>
  );
}
