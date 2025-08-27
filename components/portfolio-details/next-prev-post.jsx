import React from 'react';
import Link from 'next/link';

const NextPrevPost = () => {
  return (
    <div className="next-prev-post">
      <div className="container">
        <div className="next-prev-wrap">
          <Link href="/portfolio-details" className="prev-post">
              <i className="fas fa-arrow-left"></i>
              <span>Previous post</span>
          </Link>
          <Link href="/portfolio-details" className="prev-post">
              <span>Next post</span>
              <i className="fas fa-arrow-right"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NextPrevPost;