import React from 'react';
import { ThreeCircles } from 'react-loader-spinner';

const Spinner = ({ message }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full h-full">
            <ThreeCircles
                height={50}
                width={200}
                // color="#E01A4F"
                wrapperClass="m-5"
                visible={true}
                ariaLabel="three-circles-rotating"
                outerCircleColor="#E01A4F"
                innerCircleColor="#051014"
                middleCircleColor="#901FE0"
            />
            <p className="text-lg text-center px-2">{message}</p>
        </div>
    )
}

export default Spinner