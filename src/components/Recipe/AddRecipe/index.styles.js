import styled from 'styled-components'

export const Container = styled.div`
    width: 100%;
    height: 100%; 
    color: #FFFFFF;
    display: flex;
    flex-direction: column;
    margin: 0 auto;
    align-items: center;
    box-sizing: border-box;
    row-gap: 200px;
    flex-wrap: wrap;
`
export const Title = styled.div`
    font-weight: 800;
    font-size: 31px;
    margin-bottom: 58px;
`

export const TitleInput = styled.input`
    text-align: center;
    border: ${props => props.invalid ? '1px solid #BD255B' : 'none'};
    color: ${props => props.dark ? 'white' : 'black'};
    background-color: ${props => props.dark ? 'transparent' : 'white'};
    border-radius: 4px;
    width: auto;
    ::placeholder {
        color: ${props => props.dark ? 'white' : 'black'};
    }
    :focus::placeholder {
        color: transparent;
    }
    :disabled {
        background-color: ${props => props.dark ? 'transparent' : 'white'};
    }
`

export const ContentContainer = styled.div`
    @media screen {min-device-width: 1200px} {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 20px;
}
`

export const Section = styled.div`
    background: green;
    padding: 20px;
    @media screen {min-device-width: 1200px} {
        width: 500px;
    }
`
export const InputContainer = styled.div`
    padding: 5px;
`