import React, { useState } from 'react';
import { Box, Button, Input, Image, Text, VStack } from '@chakra-ui/react';
import OpenAI from 'openai';

function KeywordExtractor() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [keywords, setKeywords] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // 파일 선택 핸들러
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  // 키워드 추출 요청 핸들러
  const handleExtractKeywords = async () => {
    if (!selectedImage) {
      alert('이미지를 선택해주세요.');
      return;
    }

    setIsLoading(true);

    try {
      const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

      if (!apiKey) {
        throw new Error('OpenAI API 키가 설정되지 않았습니다.');
      }

      // OpenAI 인스턴스 생성
      const openai = new OpenAI({
        apiKey,
        dangerouslyAllowBrowser: true, // 브라우저에서 실행 허용
      });

      // OpenAI API 호출
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          {
            role: 'user',
            content:
              'I have a clothing item. Please provide 5 keywords about it, focusing on its color, type, and unique features.',
          },
        ],
      });

      const description = completion.choices[0].message.content;
      const keywordsArray = description.split(',').map((kw) => kw.trim());

      setKeywords(keywordsArray);
    } catch (error) {
      console.error('키워드 추출 실패:', error);
      alert('키워드 추출에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box textAlign="center" p={4}>
      <VStack spacing={4}>
        {/* 이미지 선택 */}
        <Input type="file" accept="image/*" onChange={handleImageChange} />

        {/* 선택한 이미지 미리보기 */}
        {selectedImage && (
          <Image
            src={URL.createObjectURL(selectedImage)}
            alt="Selected"
            boxSize="200px"
            objectFit="cover"
            mt={4}
          />
        )}

        {/* 키워드 추출 버튼 */}
        <Button
          colorScheme="purple"
          onClick={handleExtractKeywords}
          isLoading={isLoading}
        >
          키워드 추출하기
        </Button>

        {/* 키워드 결과 */}
        {keywords.length > 0 && (
          <Box mt={4} p={4} borderWidth={1} borderRadius="md" w="100%">
            <Text fontWeight="bold">추출된 키워드:</Text>
            {keywords.map((keyword, index) => (
              <Text key={index} color="gray.600">
                {keyword}
              </Text>
            ))}
          </Box>
        )}
      </VStack>
    </Box>
  );
}

export default KeywordExtractor;
