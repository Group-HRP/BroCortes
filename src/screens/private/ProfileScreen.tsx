import { HeaderDefault, HeaderTitle } from "../../components/HeaderDefault";
import { ContainerDefault } from "../../components/ContainerDefault";
import { CustomContainer } from "../../components/Containers";
import { Text } from "../../components/Typography";

export default function ProfileScreen(){
    return(
        <ContainerDefault>
            <HeaderDefault display="flex" flexDirection="row" paddingTop={44}>
                <CustomContainer display="flex" gap={4}>
                    <HeaderTitle>João Pedro</HeaderTitle>
                    <Text fontWeight="medium">Conta Pessoal</Text>
                </CustomContainer>
                {/* Colocar imagem do perfil aqui */}
            </HeaderDefault>
        </ContainerDefault>
    );
}