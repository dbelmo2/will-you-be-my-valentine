import { useRef, useState } from 'react'
import Slide from '@mui/material/Slide';
import MoviePage from './pages/MoviePage';
import QuestionPage from './pages/Question';
import { Box } from '@mui/material';


function App() {


  const [ showSlideOne, setShowSlideOne ] = useState(true);
  const [ showSlideTwo, setShowSlideTwo ] = useState(false);
  const containerRef = useRef<HTMLElement>(null);


  const onSlideOneDone = () => {
    setShowSlideOne(false);
  }


  return (
    <Box 
      className='page'
    >
      <Box
        sx={{
          height: '100%',
          width: '750px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        ref={containerRef as React.RefObject<HTMLDivElement>}
      >
          <Slide
            direction='right'
            in={showSlideOne}
            appear={false}
            timeout={1000}
            onExited={() => setShowSlideTwo(true)}
          >
            <Box
              sx={{
                position: 'absolute',
                height: '100%',
                width: '100vw',
              }}

            >
              
              <QuestionPage
                isShowing={!showSlideTwo}
                onDone={onSlideOneDone}
              />
            </Box>
          </Slide>
            

            { !showSlideTwo ? 
              <></> :

                <Box
                  sx={{


                  }}
                >
                    <MoviePage />

                  </Box>
            
              
            }
            













        </Box>
    </Box>
  )
}

export default App;
