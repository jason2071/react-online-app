import Footer from "./components/Footer";
import { Header } from "./components/Header";

import "./App.css";
import styled from "styled-components";

function App() {
  return (
    <>
      <Header />

      <Title>Hello World</Title>

      <button className="Button">Submit</button>

      <p>&nbsp;</p>

      <button>Pressed</button>

      <Section>
        <p>
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book. It has survived not only five centuries,
          but also the leap into electronic typesetting, remaining essentially
          unchanged. It was popularised in the 1960s with the release of
          Letraset
        </p>
      </Section>

      <Button onClick={() => alert("Hello World")}>Normal</Button>
      <Button primary onClick={() => alert("Hello Primary")}>
        Primary
      </Button>

      <Footer />
    </>
  );
}

export default App;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: lightskyblue;
`;

const Section = styled.section`
  padding: 4em;
  background: papayawhip;
  margin: 20px;
`;

const Button = styled.button`
  background: ${(props) => (props.primary ? "palevioletred" : "white")};
  color: ${(props) => (props.primary ? "white" : "palevioletred")};
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid palevioletred;
  border-radius: 3px;
`;
