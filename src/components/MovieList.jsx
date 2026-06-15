import React, { useRef, useState, useEffect, useCallback, useMemo } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import MovieCard from './MovieCard'

const MovieList = ({ title, movies }) => {
    const rowRef = useRef(null);
    const animatingRef = useRef(false);
    const timeoutRef = useRef(null);
    const [pages, setPages] = useState(1);
    const [activePage, setActivePage] = useState(0);
    const [canLeft, setCanLeft] = useState(false);
    const [canRight, setCanRight] = useState(false);

    const updateState = useCallback(() => {
        const el = rowRef.current;
        if (!el) return;
        if (animatingRef.current) return; // ignore while animating programmatic scroll

        const cw = el.clientWidth;
        const sw = el.scrollWidth;
        const p = Math.max(1, Math.ceil(sw / cw));
        setPages(p);

        const maxScroll = sw - cw;
        const left = el.scrollLeft;

        // Map scrollLeft proportionally to page index so the last items map to the last tick
        const pageIndex = maxScroll > 0 ? Math.round((left / maxScroll) * (p - 1)) : 0;
        setActivePage(Math.min(Math.max(0, pageIndex), p - 1));

        setCanLeft(left > 8);
        setCanRight(left < maxScroll - 8);
    }, []);

    useEffect(() => {
        const el = rowRef.current;
        if (!el) return;

        updateState();
        el.addEventListener('scroll', updateState, { passive: true });
        window.addEventListener('resize', updateState);
        return () => {
            el.removeEventListener('scroll', updateState);
            window.removeEventListener('resize', updateState);
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [movies, updateState]);

    const goToPage = useCallback((index) => {
        const el = rowRef.current;
        if (!el) return;
        const cw = el.clientWidth;
        const sw = el.scrollWidth;
        const p = Math.max(1, Math.ceil(sw / cw));
        const maxPage = Math.max(0, p - 1);

        // Compute scrollLeft proportionally to match the page->tick mapping used in the scroll handler
        const maxScroll = Math.max(0, sw - cw);
        const clampedIndex = Math.min(Math.max(0, index), maxPage);
        const target = maxPage > 0 ? Math.round((clampedIndex / maxPage) * maxScroll) : 0;

        // update UI state immediately, then perform programmatic scroll and lock updates briefly
        setActivePage(clampedIndex);
        setCanLeft(clampedIndex > 0);
        setCanRight(clampedIndex < maxPage);
        animatingRef.current = true;
        el.scrollTo({ left: target, behavior: 'smooth' });
        // unlock after animation - small buffer to ensure onScroll settled
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            animatingRef.current = false;
            updateState();
            timeoutRef.current = null;
        }, 520);
    }, [updateState]);

    const scrollByPage = useCallback((dir = 1) => {
        const maxPage = Math.max(0, pages - 1);
        const next = Math.min(maxPage, Math.max(0, activePage + dir));
        setActivePage(next);
        setCanLeft(next > 0);
        setCanRight(next < maxPage);
        goToPage(next);
    }, [pages, activePage, goToPage]);

    // limit number of visible ticks to keep UI compact (like Netflix)
    const { tickCount, activeTick } = useMemo(() => {
        const tc = Math.min(pages, 6);
        const at = pages > 1 ? Math.round((activePage / Math.max(1, pages - 1)) * (tc - 1)) : 0;
        return { tickCount: tc, activeTick: at };
    }, [pages, activePage]);

    return (movies &&
        <div className='px-12'>
            <div className='flex items-center'>
                <h1 className='text-xl font-bold py-4 text-white'>{title}</h1>
                <div className='flex-1 ml-4 flex items-center justify-end'>
                    <div className='hidden md:flex items-center space-x-2'>
                        {Array.from({ length: tickCount }).map((_, i) => (
                            <span
                                key={i}
                                className={`w-6 h-1 rounded transition-colors duration-300 ease-out ${i === activeTick ? 'bg-gray-200' : 'bg-gray-600/50'}`}
                                aria-hidden='true'
                            />
                        ))}
                    </div>
                </div>
            </div>

            <div className='relative group'>
                <div
                    ref={rowRef}
                    className='overflow-x-auto overflow-y-hidden scrollbar py-2'
                    style={{ WebkitOverflowScrolling: 'touch', touchAction: 'pan-x' }}
                >
                    <div className='inline-flex space-x-2'>
                        {movies.map((movie) => (
                            <MovieCard key={movie.id} posterPath={movie.poster_path} />
                        ))}
                    </div>
                </div>

                {/* Left button at the left side */}
                <button
                    aria-label='scroll left'
                    onClick={() => scrollByPage(-1)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute left-0 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 ${canLeft ? '' : 'hidden'}`}
                >
                    <FaChevronLeft className='h-5 w-5' />
                </button>

                {/* Right button at the right side */}
                <button
                    aria-label='scroll right'
                    onClick={() => scrollByPage(1)}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute right-0 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full z-20 ${canRight ? '' : 'hidden'}`}
                >
                    <FaChevronRight className='h-5 w-5' />
                </button>
            </div>
        </div>
    );
}

export default MovieList;