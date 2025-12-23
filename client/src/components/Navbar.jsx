import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from "styled-components";
import Button from './button';
import { AddRounded, ExploreRounded, MoreVert } from '@mui/icons-material'
import { useState, useEffect } from 'react';


const Container = styled.div`
    position: relative;
    flex: 1;
    background: ${({ theme }) => theme.navbar};
    color: ${({ theme }) => theme.menu_primary_text};
    height: 80px;
    font-weight: bold;
    padding: 14px 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    
    @media (max-width: 768px) {
        height: 70px;
        padding: 10px 16px;
    }
    @media (max-width: 480px) {
        height: 60px;
        padding: 8px 12px;
    }
`;


const Logo = styled.div`
    cursor: pointer;
    font-size: 34px;
    transition: all 0.3s ease;
    
    @media (max-width: 768px) {
        font-size: 28px;
    }
    @media (max-width: 480px) {
        font-size: 24px;
    }
    
    &:hover {
        color: ${({ theme }) => theme.secondary};
    }
`;

const DropdownMenu = styled.div`
  position: relative;
  display: inline-block;
`;

const DropdownContent = styled.div`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: absolute;
  right: 0;
  top: calc(100% + 8px);
  background: ${({ theme }) => theme.card};
  min-width: 140px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.15);
  border-radius: 12px;
  padding: 0px 0;
  z-index: 1000;
  border: 1px solid ${({ theme }) => theme.text_secondary}20;
`;


const DropdownItem = styled.div`
  padding: 12px 20px;
  cursor: pointer;
  color: ${({ theme }) => theme.text_primary};
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.secondary}10;
    color: ${({ theme }) => theme.secondary};
  }
  
  &:first-child {
    border-radius: 12px 12px 0 0;
  }
  
  &:last-child {
    border-radius: 0 0 12px 12px;
  }
`;

const CompactButton = styled.button`
  background: ${({ theme }) => theme.secondary};
  border: none;
  border-radius: 10px;
  padding: 8px 12px;
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  
  &:hover {
    background: ${({ theme }) => theme.secondary}dd;
  }
`;


const ButtonContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
`;

const Navbar = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const path = location.pathname.split('/');
    
    useEffect(() => {
        const handleClickOutside = () => setDropdownOpen(false);
        if (dropdownOpen) {
            document.addEventListener('click', handleClickOutside);
        }
        return () => document.removeEventListener('click', handleClickOutside);
        }, [dropdownOpen]);


    return (
    <Container>
      <Logo onClick={() => navigate("/")}>GenAI</Logo>
      
      <ButtonContainer>
                {path[1] === "post" ? (
                    <Button
                        type="secondary"          
                        onClick={() => navigate("/")}
                        text="EXPLORE POSTS"
                        leftIcon={<ExploreRounded sx={{ fontSize: "18px" }} />}               
                    />                
                ) : (
                    <Button
                        onClick={() => navigate("/post")}
                        text="Create new post"
                        leftIcon={<AddRounded sx={{ fontSize: "18px" }} />}
                    />              
                )}
                    <DropdownMenu onClick={(e) => e.stopPropagation()}>
                        <CompactButton onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <MoreVert sx={{ fontSize: "18px" }} />
                        </CompactButton>
                        <DropdownContent isOpen={dropdownOpen}>
                            <DropdownItem onClick={() => { navigate("/about"); setDropdownOpen(false); }}>About</DropdownItem>
                            <DropdownItem onClick={() => { navigate("/contact"); setDropdownOpen(false); }}>Contact</DropdownItem>
                        </DropdownContent>
                    </DropdownMenu>

        </ButtonContainer>
    </Container>
  );
};

export default Navbar;
