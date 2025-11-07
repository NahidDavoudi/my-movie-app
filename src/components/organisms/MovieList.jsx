import React from 'react';
import Link from 'next/link';
import Card from '@/components/molecules/Card';
const MovieList = ({movies}) => {
    return(
        <div className='grid grid-cols-4 gap-4'>
            {movies.map((movie) => (
                <Link key={movie.id} href={`/movies/${movie.id}`}>
                    <Card>
                        <img src={movie.poster} alt={movie.title} className="w-[180px] h-[270px] object-cover" />
                    </Card>
                </Link>
            ))}
        </div>
    )
}
export default MovieList