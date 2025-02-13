import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useRef, useState } from 'react';
import Slide from '@mui/material/Slide';
import MoviePage from './pages/MoviePage';
import QuestionPage from './pages/Question';
import { Box } from '@mui/material';
function App() {
    const [showSlideOne, setShowSlideOne] = useState(true);
    const [showSlideTwo, setShowSlideTwo] = useState(false);
    const containerRef = useRef(null);
    const onSlideOneDone = () => {
        setShowSlideOne(false);
    };
    return (_jsx(Box, { className: 'page', children: _jsxs(Box, { sx: {
                height: '100%',
                width: '750px',
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }, ref: containerRef, children: [_jsx(Slide, { direction: 'right', in: showSlideOne, appear: false, timeout: 1000, onExited: () => setShowSlideTwo(true), children: _jsx(Box, { sx: {
                            position: 'absolute',
                            height: '100%',
                            width: '100vw',
                        }, children: _jsx(QuestionPage, { isShowing: !showSlideTwo, onDone: onSlideOneDone }) }) }), !showSlideTwo ?
                    _jsx(_Fragment, {}) :
                    _jsx(Box, { sx: {}, children: _jsx(MoviePage, {}) })] }) }));
}
export default App;
