

const VideoTitle = ({mainMovie}) => {
    return (
        <div className="absolute top-20 md:top-36 left-0 z-20 px-6 md:px-12 py-4 md:py-8 bg-gradient-to-r from-black text-white">
            <h1 className="text-2xl md:text-5xl font-bold">{mainMovie?.original_title}</h1>
            <p className="text-sm md:text-lg mt-2 md:mt-4 max-w-xs md:max-w-lg">{mainMovie?.overview}</p>
            <div className="mt-4 md:mt-6">
                <button className="bg-white text-black px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold mr-4 hover:opacity-80">Play</button>
                <button className="bg-gray-800 bg-opacity-70 text-white px-4 py-2 md:px-6 md:py-3 rounded-md font-semibold hover:opacity-80">More Info</button>
            </div>  
        </div>
    )
}

export default VideoTitle;