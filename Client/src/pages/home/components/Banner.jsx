import { useState, useRef, useEffect } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import './SliderBanner.css';

const Banner = () => {
    const slides = [
        { image: 'gym-thumbnail1.png', name: 'SPORT CENTER', description: 'Tinh ru anh hieu di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'gym-thumbnail2.png', name: 'SPORT CENTER', description: 'Tinh ru anh toan di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'sym-thumbnail1.png', name: 'SPORT CENTER', description: 'Tinh ru anh tuan di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'soccer-thumbnail1.png', name: 'SPORT CENTER', description: 'Tinh ru anh di nghia di chay pho, chua kip chay pho thi anhchay mat tieu' },
        { image: 'soccer-thumbnail2.png', name: 'SPORT CENTER', description: 'Tinh ru anh tai di chay pho, chua kip chay pho thi anhchay mat tieu' },
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);
    const autoplayRef = useRef(null);

    const nextSlide = () => {
        const lists = slideRef.current.children;
        if (lists.length > 0) {
            setCurrentIndex((currentIndex + 1) % slides.length);
            slideRef.current.appendChild(lists[0]);
        }
    };

    const prevSlide = () => {
        const lists = slideRef.current.children;
        if (lists.length > 0) {
            setCurrentIndex((currentIndex - 1 + slides.length) % slides.length);
            slideRef.current.prepend(lists[lists.length - 1]);
        }
    };

    // Thêm autoplay
    useEffect(() => {
        const play = () => {
            nextSlide();
        };

        autoplayRef.current = setInterval(play, 5000); // Chuyển slide mỗi 3 giây

        return () => {
            clearInterval(autoplayRef.current); // Dọn dẹp khi component unmount
        };
    }, [currentIndex]);

    return (
        <div className="min-h-screen flex justify-center items-center">
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[1300px] h-[600px] p-[50px] bg-[#f5f5f5] shadow-[0_30px_50px_rgba(219,219,219,1)] overflow-hidden">
                <div id="sw-max mt-[50px]" ref={slideRef}>
                    {slides.map((slide, index) => (
                        <div
                            key={index}
                            className={`slide-element ${index === currentIndex ? 'visible' : ''}`}
                            style={{ backgroundImage: `url(${slide.image})` }}
                        >
                            <div className="slide-info">
                                <div className="slide-title">{slide.name}</div>
                                <div className="slide-detail">{slide.description}</div>
                                <button className="slide-button bg-green-400 rounded-lg">
                                    Booking Now
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="absolute bottom-8 z-50 text-center w-full flex justify-center gap-4">
                    <button
                        className="group flex items-center justify-center w-12 h-12 rounded-full border border-white bg-transparent transition duration-500 hover:bg-white cursor-pointer"
                        id="prev"
                        onClick={prevSlide}
                    >
                        <FaAngleLeft className="text-white text-xl group-hover:text-black transition duration-500" />
                    </button>
                    <button
                        className="group flex items-center justify-center w-12 h-12 rounded-full border border-white bg-transparent transition duration-500 hover:bg-white cursor-pointer"
                        id="next"
                        onClick={nextSlide}
                    >
                        <FaAngleRight className="text-white text-xl group-hover:text-black transition duration-500" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Banner;