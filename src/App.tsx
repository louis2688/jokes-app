import React, { useState, useEffect } from 'react';
import { Button, CircularProgress, Container, Typography, Stack } from '@mui/material';
import axios from 'axios';

type Joke = {
  joke: string;
};

const JokesApp: React.FC = () => {
  const [jokes, setJokes] = useState<Joke[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchJokes = async () => {
    setIsLoading(true);
    try {
      const responses = await Promise.all([
        axios.get('https://v2.jokeapi.dev/joke/Programming?type=single'),
        axios.get('https://v2.jokeapi.dev/joke/Programming?type=single'),
        axios.get('https://v2.jokeapi.dev/joke/Programming?type=single'),
      ]);
      const newJokes: Joke[] = responses.map((response) => ({
        joke: response.data.joke,
      }));
      newJokes.sort((a, b) => a.joke.length - b.joke.length);
      setJokes(newJokes);
    } catch (error) {
      console.log('Error fetching joke:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchJokes();
  }, []);

  const refreshJokes = () => {
    fetchJokes();
  };

  return (
    <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
      <Stack spacing={2} sx={{ bgcolor: 'success.main', borderRadius: "10px" }}>
      <Typography variant="h4" align="center" sx={{margin: "1rem auto", color: "white"}} gutterBottom>
      Tell me a Joke
      </Typography>
      </Stack>
      <Stack spacing={2}>
      {isLoading ? (
        <CircularProgress sx={{ display: 'block', margin: '7rem auto' }} />
      ) : (
        <ul>
          {jokes.map((joke, index) => (
            <Typography key={index} variant="body1" component="li" sx={{ marginBottom: '2rem', listStyleType: "none" }}>
              {joke.joke}
            </Typography>
          ))}
        </ul>
      )}
      </Stack>
      
      <Button variant="contained" onClick={refreshJokes} disabled={isLoading} sx={{borderRadius: "10px"}} fullWidth>
        {isLoading ? 'Loading...' : 'Refresh'}
      </Button>
    </Container>
  );
};

export default JokesApp;