import React from 'react';
import './PageLoading.css';

const PageSkeleton = () => {
    return (
        <>
            <div className="page-header-container">
                <div className="skeleton-header"></div>
            </div>
            <div className="skeleton-content-container">
                <div className="skeleton-content"></div>
            </div>
            <div className="skeleton-footer-container">
                <div className="skeleton-footer"></div>
            </div>
        </>
    );
};

export default PageSkeleton;
