import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Button,
  Grid,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  VStack,
  useToast,
  Text,
  Flex,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { getBibleReads, toggleBibleChapter } from "../hooks/bibleReadsHook";
import { bibleBookNames, bibleBooks } from "../data/bibleSchedule";

const BibleTracker = () => {
  const [selectedBook, setSelectedBook] = useState<string>("");
  const [bookSearch, setBookSearch] = useState("");
  const [readChapters, setReadChapters] = useState<Record<string, boolean | string>>({});
  const [loading, setLoading] = useState(true);
  const [toggling, setToggling] = useState<string | null>(null);
  const toast = useToast();
  const navigate = useNavigate();

  // 검색어에 맞는 책 목록
  const filteredBookNames = useMemo(() => {
    if (!bookSearch.trim()) return bibleBookNames;
    const q = bookSearch.trim().toLowerCase();
    return bibleBookNames.filter((b) => b.toLowerCase().includes(q));
  }, [bookSearch]);

  // 첫 책 자동 선택
  useEffect(() => {
    if (bibleBookNames.length && !selectedBook) {
      setSelectedBook(bibleBookNames[0]);
    }
  }, [selectedBook]);

  // 읽은 성경 로드
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const chapters = await getBibleReads();

      setReadChapters(chapters);
      setLoading(false);
    };

    load();
  }, []);

  const chapters = selectedBook ? bibleBooks[selectedBook] || [] : [];
  const isRead = (book: string, ch: string) => !!readChapters[`${book}-${ch}`];

  const onChapterClick = async (book: string, chapter: string) => {
    const key = `${book}-${chapter}`;
    const wasRead = !!readChapters[key];
    setToggling(key);
    const result = await toggleBibleChapter(book, chapter);
    setToggling(null);
    if (result === "fail") {
      toast({
        title: "오류",
        description: "저장에 실패했습니다.",
        status: "error",
        isClosable: true,
      });
      return;
    }
    setReadChapters((prev) => {
      const next = { ...prev };
      if (next[key]) delete next[key];
      else next[key] = true;
      return next;
    });
    toast({
      title: wasRead ? "읽음 해제됨" : "읽음 체크됨",
      description: wasRead ? `${book} ${chapter}장 읽음 해제` : `${book} ${chapter}장 읽음으로 저장`,
      status: "success",
      position: "top",
      duration: 2000,
      isClosable: true,
    });
  };

  return (
    <Box p={4}>
      <Button onClick={() => navigate(-1)} size="sm" mb={4}>
        &lt; back
      </Button>
      <Heading mb={4} size="lg" textAlign="center">
        성경 읽기 체크
      </Heading>

      <VStack align="stretch" spacing={6}>
        {/* 검색 가능한 책 선택 */}
        <Box>
          <Text fontSize="sm" fontWeight="bold" mb={2}>
            성경 책 선택
          </Text>
          <InputGroup>
            <InputLeftElement pointerEvents="none" color="gray.400" children="📖" />
            <Input
              placeholder="책 이름 검색 (예: 창세기, 출애굽기)"
              value={bookSearch}
              onChange={(e) => setBookSearch(e.target.value)}
              bg="white"
            />
          </InputGroup>
          <Box mt={2}>
            <Text fontSize="xs" color="gray.500" mb={1}>
              ↕ 목록이 많으면 아래로 스크롤
            </Text>
            <Flex
              flexWrap="wrap"
              gap={2}
              maxH="120px"
              overflowY="auto"
              p={2}
              border="1px solid"
              borderColor="gray.200"
              borderRadius="md"
              bg="gray.50"
              sx={{
                "&::-webkit-scrollbar": { width: "8px" },
                "&::-webkit-scrollbar-track": { bg: "gray.100", borderRadius: "full" },
                "&::-webkit-scrollbar-thumb": { bg: "gray.400", borderRadius: "full" },
                "&::-webkit-scrollbar-thumb:hover": { bg: "gray.500" },
              }}
            >
              {filteredBookNames.map((book) => (
                <Button
                  key={book}
                  size="sm"
                  variant={selectedBook === book ? "solid" : "outline"}
                  colorScheme="blue"
                  onClick={() => setSelectedBook(book)}
                >
                  {book}
                </Button>
              ))}
            </Flex>
          </Box>
        </Box>

        {/* 선택한 책의 장 버튼 */}
        {selectedBook && (
          <Box>
            <Text fontSize="sm" fontWeight="bold" mb={2}>
              {selectedBook} — 장 선택 (누르면 읽음 체크/해제)
            </Text>
            {loading ? (
              <Text>불러오는 중...</Text>
            ) : (
              <Grid templateColumns="repeat(6, 1fr)" gap={2}>
                {chapters.map((ch) => {
                  const key = `${selectedBook}-${ch}`;
                  const read = isRead(selectedBook, ch);
                  const busy = toggling === key;
                  return (
                    <Button
                      key={key}
                      size="sm"
                      isLoading={busy}
                      bg={read ? "blue.500" : "gray.200"}
                      color={read ? "white" : "black"}
                      _hover={{
                        bg: read ? "blue.600" : "gray.300",
                      }}
                      onClick={() => onChapterClick(selectedBook, ch)}
                    >
                      {ch}
                    </Button>
                  );
                })}
              </Grid>
            )}
          </Box>
        )}
      </VStack>
    </Box>
  );
};

export default BibleTracker;
