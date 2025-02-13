
// @ts-nocheck

import React, { useState, useMemo, useRef } from 'react'
import TinderCard from 'react-tinder-card'
import './css/MovePage.css';
import { Box, Button, Typography } from '@mui/material';
import shawImg from './images/shaw-shank.jpg';
import goodImg from './images/good-will.jpg';
import severanceImg from './images/severance.jpg';
import notebookImg from './images/notebook.jpg';
import faultImg from './images/the-fault.jpg';
import djangoImg from './images/django.jpg';
import prestigeImg from './images/prestige.jpg';
import itEndsImg from './images/it-ends-with-us.jpg';
import anyoneImg from './images/anyone-but-you.jpg';
import palmImg from './images/palm-springs.jpeg';
import ladyImg from './images/portrait-lady.jpg';
import childrenImg from './images/children-of-men.jpg';
import atonementImg from './images/atonement.jpg';
import moonImg from './images/moon.jpg';
import exImg from './images/ex-machina.jpg';
import { DotLottiePlayer } from '@dotlottie/react-player';

const decisionButton = {
  color: 'white',
  height: '36px',
  marginX: '10px',
  backgroundColor: '#df4646',
  '&:hover': {
    backgroundColor: '#a70808'
  }
};


const db = [
  {
    name: 'Shawshank redemption',
    url: shawImg,
  },
  {
    name: 'Goodwill hunting',
    url: goodImg
  },
  {
    name: 'Severance',
    url: severanceImg
  },
  {
    name: 'The notebook',
    url: notebookImg
  },
  {
    name: 'The fault in our stars',
    url: faultImg
  },
  {
    name: 'Django unchained',
    url: djangoImg,
  },
  {
    name: 'The prestige',
    url: prestigeImg 
  },
  {
    name: 'It ends with us',
    url: itEndsImg
  },
  {
    name: 'Anyone but you',
    url: anyoneImg
  },
  {
    name: 'Palm springs',
    url: palmImg
  },
  {
    name: 'Portrait of a lady on fire',
    url: ladyImg
  },
  {
    name: 'Children of men',
    url: childrenImg
  },
  {
    name: 'Atonement',
    url: atonementImg
  },
  {
    name: 'Moon',
    url: moonImg
  },
  {
    name: 'Ex machina',
    url: exImg
  },

]

const results = new Map();


function Advanced () {
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [isDone, setIsDone ] = useState(false);




  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map(() => React.createRef()),
    []
  )

  const updateCurrentIndex = (val: number) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1

  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction: string, index: number) => {
    if (currentIndex <= 1) {
      setIsDone(true);
    }
    updateCurrentIndex(index - 1)
    if (direction === 'left') {
      results.set(db[currentIndex].name, false)
    } else {
      results.set(db[currentIndex].name, true)
    }
    if (Array.from(results).filter(([key, value]) => value === true).length >= 3) {
      setIsDone(true);
    }

  }

  const outOfFrame = (name: string, idx: number) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir: string) => {
    console.log('currentIndex', currentIndex);
    if (currentIndex <= 1) {
      setIsDone(true);
    } else if (canSwipe && currentIndex < db.length) {
      if (dir === 'left') {
        results.set(db[currentIndex].name, false)
      } else {
        results.set(db[currentIndex].name, true)
      }
      if (Array.from(results).filter(([key, value]) => value === true).length >= 3) {
        setIsDone(true);
      }
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column'

      }}
    >




      {
      isDone ? 
              <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                <DotLottiePlayer
                  className='heart-animation' 
                  src="https://lottie.host/8fb4c417-1b8f-4028-be70-b942fe96193d/dYjFYj38Ho.lottie" 
                  background="transparent"
                  loop autoplay
                  key='1'
                />
                
                <Box >
                  <Typography sx={{ color: '#a70808', fontSize: '32px'}} >
                    Your top 3 picks are:
                  </Typography>
                  {Array.from(results, ([key, value]) => ({ key, value })).filter((res) => res.value === true).map((result, index) => (
                    <Typography key={result.key} sx={{ fontSize: '24px', color: '#a70808' }}>
                      {result.key}
                    </Typography>
                  ))}
                </Box>

                <DotLottiePlayer
                  className='heart-animation' 
                  src="https://lottie.host/8fb4c417-1b8f-4028-be70-b942fe96193d/dYjFYj38Ho.lottie" 
                  background="transparent"
                  loop autoplay
                  key='1'
                />
                
              </Box>
        :
        <>

                
      
      <Typography sx={{color: '#a70808', fontSize: '32px', marginBottom: '100px'}}>
        Select your top 3 choices!!!
      </Typography>

              <div className='cardContainer'>
        {db.map((character, index) => (
          <TinderCard
            ref={childRefs[index]}
            className='swipe'
            key={character.name}
            onSwipe={(dir) => swiped(dir, index)}
            onCardLeftScreen={() => outOfFrame(character.name, index)}
          >
            <div
              style={{ backgroundImage: 'url(' + character.url + ')' }}
              className='card'
            >
            </div>
          </TinderCard>
        ))}
      </div>

      <div className='buttons'>
        <Button sx={{ ...decisionButton }} onClick={() => swipe('left')}>No</Button>
        <Button disabled={!canGoBack} sx={{ ...decisionButton }} onClick={() => goBack()}>Undo swipe!</Button>
        <Button sx={{ ...decisionButton }} onClick={() => swipe('right')}>Yes</Button>
      </div>
        </>
    
    
    
    
      }



    </Box>
  )
}

export default Advanced