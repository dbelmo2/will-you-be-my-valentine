import { forwardRef, useEffect, useState } from 'react'
import { DotLottiePlayer } from '@dotlottie/react-player'
import { Box, Button, Typography } from '@mui/material';
import FalseButton from '../components/FalseButton';
import './css/Question.css';
import '../App.css';


interface MyComponentProps {
    onDone: () => void;
    isShowing: boolean;
  }

  export interface MyComponentRef {
    triggerAction: () => void;
  }

const decisionButton = {
    color: 'white',
    height: '36px',
    marginX: '50px',
    backgroundColor: '#df4646',
    '&:hover': {
      backgroundColor: '#a70808'
    }
  };


const QuestionPage = forwardRef<MyComponentProps, MyComponentProps>(( { onDone, isShowing} ) => {
    const [ feedbackMessage, setFeedbackMessage ] = useState('');
    const [ noClicked, setNoClicked ] = useState(false);
    const [ yesClicked, setYesClicked ] = useState(false);
  

    const transitionAnimation = () => {
      const element = document.querySelector('.main-animation');
        if (element) {
          setTimeout(() => {
            element.classList.add('transitioned');
        }, 1500);
      }
    };
    
  
    const noButtonOnClickHandler = () => setNoClicked(true);

    const yesButtonOnClickHandler = () => {
        setYesClicked(true);
        setFeedbackMessage('WOOOOOOOOOOO!!!!!');

    }
  
    useEffect(() => {
      transitionAnimation();
    });
  
    useEffect(() => {
      setFeedbackMessage(noClicked ? 'try again!' : '');
    }, [noClicked]);
    return (
        <Box
            sx={{
                display: isShowing ? 'flex' : 'none',
                justifyContent: 'center',
                zIndex: 1,
                flexDirection: 'column',
                alignItems: 'center',
                height: '100%',
                width: '100vw',
                minWidth: '500px'
                
            }}
        >

        <script src="https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs" type="module"></script> 
          <DotLottiePlayer
            className='main-animation' 
            src="https://lottie.host/e746e932-37ae-484f-bc8a-0daa720c0b90/S00n1V9p4F.lottie" 
            background="transparent"
            loop autoplay
            key='1'
          />
          <Typography 
            sx={{
                position: 'fixed',
                top: '40%',
                left: '50%',
                transform: 'translate(-50%, -40%)',
                fontFamily: 'caveat',
                fontSize: '3rem',
                width: '100%',
                fontWeight: '700',
                color: '#a70808',
                textAlign: 'center',
                marginBottom: '100px'
  
            }}
            className='visible-element'
          >
            Will you be my valentine?
          </Typography>
  
          <div className='buttons-container'>

            {
                !yesClicked ?
                <>
                    <Button 
                        onClick={yesButtonOnClickHandler}
                        disabled={yesClicked}
                        className='visible-element' 
                        sx={{
                            ...decisionButton
                        }}
                    >
                        Yes
                    </Button>
        
                    <FalseButton
                    disabled={yesClicked} 
                    className='visible-element'
                    onClick={noClicked ? yesButtonOnClickHandler : noButtonOnClickHandler}
                    />
                </> :
                <Button 
                    sx={{
                        ...decisionButton
                    }}
                    className='pulse'
                    onClick={onDone}
                >
                    Plan Date
                </Button>
            }

  
  
          </div>

          <Typography 
            sx={{
                marginTop: '50px',
                height: '45px',
                display: 'flex',
                justifyContent: 'end',
                flexDirection: 'column',
                color: '#a70808',
                fontWeight: 'bold'
            }}
            >
          { feedbackMessage }
        </Typography>
        </Box>
    )
})

export default QuestionPage;