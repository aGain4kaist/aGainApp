import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
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

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/home'); // 로그인 후 홈으로 리다이렉션
    } catch (error) {
      let message = '로그인에 실패했습니다.';
      if (error.code === 'auth/user-not-found') {
        message = '해당 사용자가 존재하지 않습니다.';
      } else if (error.code === 'auth/wrong-password') {
        message = '비밀번호가 잘못되었습니다.';
      }
      alert(message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      alert('구글 로그인에 실패했습니다.');
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
          placeholder="아이디"
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
        <Button colorScheme="purple" width="100%" mt={6} onClick={handleLogin}>
          로그인
        </Button>
        <Text mt={4} textAlign="center">
          아직 계정이 없으신가요?{' '}
          <Button variant="link" onClick={() => navigate('/signup')}>
            회원가입
          </Button>
        </Text>
        <Text mt={4} textAlign="center" color="gray.500">
          SNS 계정으로 간편 로그인
        </Text>
        <Button
          colorScheme="gray"
          width="100%"
          mt={2}
          onClick={handleGoogleLogin}
        >
          Google 로그인
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
