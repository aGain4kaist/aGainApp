import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/utils/firebaseConfig';
import {
  Box,
  Button,
  Input,
  Flex,
  Text,
  IconButton,
  InputGroup,
  InputRightElement,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/'); // 회원가입 후 홈으로 리다이렉션
    } catch (error) {
      let message = '회원가입에 실패했습니다.';
      console.log(error.code);
      if (error.code === 'auth/weak-password') {
        message = '비밀번호는 최소 6자리여야 합니다.';
      } else if (error.code === 'auth/email-already-in-use') {
        message = '이미 사용 중인 이메일입니다.';
      }
      alert(message);
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bg="pink.50"
    >
      <Box mb={8} textAlign="center">
        <Text fontSize="4xl" fontWeight="bold" color="purple.600">
          21% Party
        </Text>
        <Text fontSize="lg" color="gray.500">
          모두의 지속가능한 옷장
        </Text>
      </Box>
      <Box
        width="90%"
        maxW="400px"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="lg"
      >
        <Input
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={4}
        />
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
        <InputGroup size="md" mt={4}>
          <Input
            pr="4.5rem"
            type={showConfirmPassword ? 'text' : 'password'}
            placeholder="비밀번호 확인"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              icon={showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
        <Button colorScheme="purple" width="100%" mt={6} onClick={handleSignup}>
          회원가입
        </Button>
        <Text mt={4} textAlign="center">
          이미 계정이 있으신가요?{' '}
          <Button variant="link" onClick={() => navigate('/login')}>
            로그인
          </Button>
        </Text>
      </Box>
    </Flex>
  );
}

export default Signup;
