import styled from "styled-components";
import { GitHub, LinkedIn, Email, LocationOn, Work } from '@mui/icons-material';

const Container = styled.div`
  min-height: 100vh;
  background: ${({ theme }) => theme.bg};
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Content = styled.div`
  max-width: 600px;
  width: 100%;
  padding: 40px 20px;
  text-align: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 700;
  color: ${({ theme }) => theme.text_primary};
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  font-size: 18px;
  color: ${({ theme }) => theme.text_secondary};
  margin-bottom: 40px;
`;

const ContactCard = styled.div`
  background: ${({ theme }) => theme.card};
  padding: 30px;
  border-radius: 15px;
  margin: 20px 0;
  box-shadow: 0 4px 12px ${({ theme }) => theme.shadow};
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;
  margin: 20px 0;
  font-size: 16px;
  color: ${({ theme }) => theme.text_primary};
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 30px;
  justify-content: center;
  margin: 30px 0;
`;

const SocialLink = styled.a`
  color: ${({ theme }) => theme.text_primary};
  transition: all 0.3s ease;
  padding: 15px;
  border-radius: 50%;
  background: ${({ theme }) => theme.card};
  
  &:hover {
    color: ${({ theme }) => theme.secondary};
    transform: translateY(-5px);
  }
`;

const Contact = () => {
  return (
    <Container>
      <Content>
        <Title>Let's Connect!</Title>
        <Subtitle>
          Actively seeking new opportunities in full-stack development. 
          Let's discuss how I can contribute to your team.
        </Subtitle>

        <ContactCard>
          <ContactItem>
            <Work />
            <span>Full-Stack Developer</span>
          </ContactItem>
          <ContactItem>
            <Email />
            <span>milindbhonsalework@gmail.com</span>
          </ContactItem>
          <ContactItem>
            <LocationOn />
            <span>Dallas, TX (Open for Remote & On-site Opportunities)</span>
          </ContactItem>
        </ContactCard>

        <SocialLinks>
          <SocialLink href="https://github.com/Billy-Flowers" target="_blank">
            <GitHub sx={{ fontSize: 32 }} />
          </SocialLink>
          <SocialLink href="https://www.linkedin.com/in/milind-bhonsale/" target="_blank">
            <LinkedIn sx={{ fontSize: 32 }} />
          </SocialLink>
          <SocialLink href="mailto:milindbhonsalework@gmail.com">
            <Email sx={{ fontSize: 32 }} />
          </SocialLink>
        </SocialLinks>
      </Content>
    </Container>
  );
};

export default Contact;
