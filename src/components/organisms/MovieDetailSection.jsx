import React from 'react';
import Card from '@/components/molecules/Card';
const MovieDetailSection = ({movie}) => {
    return(
        <div>
            <Card>
                <img src={movie.poster} alt={movie.title} className="w-[180px] h-[270px] object-cover" />
            </Card>
        </div>
    )
}
export default MovieDetailSection