import { faEye } from '@fortawesome/free-solid-svg-icons';
import {
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function HomeBlogCard({ blog }) {
  return (
    <>
      <div className="grid my-5 py-4 px-5 shadow-xl">
        <h1 className=" break-word text-3xl sm:text-4xl pt-2 pb-5 text-onSecondary font-commonFont">
          {blog.title.length > 92
            ? blog.title.substr(1, 92) + ' . . .'
            : blog.title}
        </h1>
        <p className="text-base sm:text-lg break-word text-justify ">
          {' '}
          {blog.emphasis ? blog.empasis : blog.body.length > 500 ? blog.body.substr(0, 500) + ' . . .' : blog.body}
        </p>
        <div className="grid grid-cols-3 m-auto gap-5 p-4">
          <div className="flex ">
            <FontAwesomeIcon
              icon={faEye}
              className="w-8 sm:w-8 text-onSecondary"
            />
            <span className="m-auto p-2">{blog.blogMeta.seen}</span>
          </div>
          <div className="flex ">
            <FontAwesomeIcon
              icon={faArrowAltCircleUp}
              className="w-8 sm:w-8 text-success"
            />
            <span className="m-auto p-2">{blog.blogMeta.upVote}</span>
          </div>
          <div className="flex ">
            <FontAwesomeIcon
              icon={faArrowAltCircleDown}
              className="w-8 sm:w-8 text-failure"
            />

            <span className="m-auto p-2">{blog.blogMeta.downVote}</span>
          </div>
        </div>
      </div>
    </>
  );
}
