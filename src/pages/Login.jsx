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
  Divider,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { Image } from '@chakra-ui/react';

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
      navigate('/home'); // 성공 시 홈으로 이동
    } catch (error) {
      console.error('구글 로그인 오류:', error);
      alert('구글 로그인에 실패했습니다. ' + (error.message || ''));
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      height="100vh"
      bg="var(--background-silver, #FAF9FF)"
    >
      <Box mb={8} textAlign="center">
        <Image
          src="/images/landing_logo.png"
          alt="21% Party Logo"
          width="147px"
          height="98px"
          mb={4}
        />
        <Text fontSize="xl" fontWeight="semibold" color="purple.700">
          모두의 지속가능한 옷장
        </Text>
      </Box>
      <Box
        width="90%"
        maxW="400px"
        bg="white"
        p={8}
        borderRadius="md"
        boxShadow="xl"
      >
        <Input
          placeholder="아이디"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb={4}
          bg="gray.100"
          focusBorderColor="purple.500"
        />
        <InputGroup size="md" mb={4}>
          <Input
            pr="4.5rem"
            type={showPassword ? 'text' : 'password'}
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            bg="gray.100"
            focusBorderColor="purple.500"
          />
          <InputRightElement width="4.5rem">
            <IconButton
              h="1.75rem"
              size="sm"
              icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              onClick={() => setShowPassword(!showPassword)}
              variant="ghost"
              _hover={{ bg: 'transparent' }}
            />
          </InputRightElement>
        </InputGroup>
        <Button
          // colorScheme="purple"
          background="var(--21-purple-dark, #411461)"
          width="100%"
          mt={4}
          onClick={handleLogin}
          size="lg"
          fontWeight="bold"
          color="var(--background-silver, #FAF9FF);"
        >
          로그인
        </Button>
        <Text mt={4} textAlign="center" color="gray.600">
          아직 계정이 없으신가요?{' '}
          <Button
            variant="link"
            color="var(--21-purple-dark, #411461)"
            onClick={() => navigate('/signup')}
          >
            회원가입
          </Button>
        </Text>
        <Divider my={6} />
        <Text mb={2} textAlign="center" color="gray.500">
          SNS 계정으로 간편 로그인
        </Text>
        <Button
          colorScheme="gray"
          width="100%"
          onClick={handleGoogleLogin}
          variant="outline"
          leftIcon={
            <Image
              src="/images/google_logo.png"
              alt="Google Logo"
              width="20px"
            />
          }
        >
          Google 로그인
        </Button>
      </Box>
    </Flex>
  );
}

export default Login;
