import React from 'react'
import UserInfoCard from '../@core/components/blogs/view/UserInfoCard'
import UserProjectsList from '../@core/components/blogs/view/UserProjectsList'

const BlogsDetail = () => {
  return (
    <div className="d-flex justify-content-between gap-3">
      <UserInfoCard />
      <UserProjectsList />
    </div>
  )
}

export default BlogsDetail
