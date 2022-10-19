import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCirclePlus,
  faSearch,
  faSort,
} from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useContext, useEffect, useState } from 'react';
import {
  blogsContext,
  fullBlogsContext,
  setBlogContext,
} from './BlogContextProvider';
import { useRouter } from 'next/router';

export default function Nav() {
  var router = useRouter();

  // try {
  //   var accessToken = JSON.parse(localStorage.getItem('user')).accessToken
  // } catch (error) {
  //   console.log(error)
  //   // router.push('/auth/login')

  // }

  const blogs = useContext(blogsContext);
  const fullBlogs = useContext(fullBlogsContext);
  const setBlogs = useContext(setBlogContext);

  const [sortBy, setSortBy] = useState('id');

  const logoutStateEnum = {
    idl: 'idl',
    loggingOut: 'Logging out . . .',
    success: 'Success',
    failed: 'Failed',
  };
  const [logoutState, setLogoutState] = useState(logoutStateEnum.idl);

  const userLoggedInStateEnum = {
    idl: 'idl',
    loggedIn: 'loggedIn',
    notLoggedIn: 'notLoggedIn',
  };
  const [userLoggedInState, setUserLoggedInState] = useState(
    userLoggedInStateEnum.idl
  );

  const [loggedInUser, setLoggedInUser] = useState(null);

  useEffect(() => {
    try {
      var user = JSON.parse(localStorage.getItem('user'));
      if (user.accessToken) {
        setUserLoggedInState(userLoggedInStateEnum.loggedIn);
        setLoggedInUser(user);
      } else {
        throw 'user not found';
      }
    } catch (error) {
      setUserLoggedInState(userLoggedInStateEnum.notLoggedIn);
    }
  }, []);
  // search feature
  function Search(searchWord) {
    let result = [];
    fullBlogs.forEach((singleData) => {
      if (
        JSON.stringify(singleData)
          .toLowerCase()
          .includes(searchWord.target.value?.toString().toLowerCase())
      ) {
        result.push(singleData);
      }
    });
    setBlogs(result);
  }
  // sort feature
  useEffect(() => {
    setBlogs([]);
    if (
      (fullBlogs.length > 0 && sortBy === 'id') ||
      sortBy === 'title' ||
      sortBy === 'author' ||
      sortBy === 'body'
    ) {
      if (fullBlogs.length > 0) {
        let blogList = fullBlogs.sort((a, b) =>
          a[sortBy] > b[sortBy] ? 1 : -1
        );
        setBlogs([...blogList]);
      } else {
        setBlogs(fullBlogs);
      }
    } else if (
      (fullBlogs.length > 0 && sortBy === 'seen') ||
      sortBy === 'upVote' ||
      sortBy === 'downVote' ||
      sortBy === 'date'
    ) {
      if (fullBlogs.length > 0) {
        var blogList = fullBlogs.sort((a, b) =>
          a.blogMeta[sortBy] > b.blogMeta[sortBy] ? -1 : 1
        );
        setBlogs([...blogList]);
      } else {
        setBlogs(fullBlogs);
      }
    } else {
      setBlogs(fullBlogs);
    }
  }, [sortBy, fullBlogs]);

  async function handleLogout() {
    setLogoutState(logoutStateEnum.loggingOut);
    try {
      let headersList = {
        Accept: '*/*',
        'Content-Type': 'multipart/json',
      };

      const user = JSON.parse(localStorage.getItem('user'));
      const url = process.env.url;
      let bodyContent = JSON.stringify({
        id: user.user.id,
        token: user.revalidateAccessToken,
      });

      let response = await fetch(`${url}/api/auth/logout`, {
        method: 'POST',
        body: bodyContent,
        headers: headersList,
      });
      let resp = await response.text();

      if (response.status === 200) {
        setLogoutState(logoutStateEnum.success);
        // check type and save login data in local storage
        localStorage.removeItem('user');
        router.reload();
      } else {
        throw resp;
      }
    } catch (error) {
      console.error('error', error.toString() || JSON.stringify(error));
    }
  }

  return (
    <div className="sticky top-0 bg-primary border-b py-2 mt-0">
      <div className="max-w-contentWid 2xl:max-w-contentWidLg mx-auto grid grid-cols-4">
        <div className="bg-secondary col-start-1 col-end-3 m-auto rounded-2xl">
          {/* search */}
          <div className="py-2 px-3 flex m-auto ">
            <div className="m-auto flex m-auto">
              <input
                className="placeholder:text-onSecondary text-onSecondary focus:outline-none border-none m-auto flex bg-secondary text-sm sm:mx-2 p-1 w-16 sm:w-40 md:w-72 lg:w-96"
                placeholder="Search"
                id="search"
                onChange={(e) => Search(e)}
              />
              <label htmlFor="search">
                <FontAwesomeIcon
                  className="cursor-pointer w-6 sm:w-6 text-onSecondary grid m-auto"
                  icon={faSearch}
                />
              </label>
            </div>
          </div>
        </div>
        <div className="m-auto">
          {/* sort */}
          <div className="flex">
            <select
              onChange={(e) => setSortBy(e.target.value)}
              id="sort"
              placeholder="sortby"
              className="cursor-pointer text-lg font-normal text-onSecondary form-select gap-5 rounded m-2 w-0 sm:w-auto p-1 bg-primary appearance-none overflow-hidden"
              defaultValue={'id'}
            >
              <option value="id" disabled>
                sort by
              </option>
              <option value="title">Title</option>
              <option value="date">Date</option>
              <option value="upVote">Up votes</option>
              <option value="seen">Audience</option>
            </select>
            <label htmlFor="sort" className="text-center m-auto">
              <FontAwesomeIcon
                className="cursor-pointer w-4 sm:w-4 m-auto flex text-onSecondary"
                icon={faSort}
              />
            </label>
            <Link href={`/bloggers`}>
              <div className="m-auto p-2">bloggers</div>
            </Link>
          </div>
        </div>
        {userLoggedInState === userLoggedInStateEnum.loggedIn ? (
          /* logged in display */
          <div className="m-auto flex">
            <Link href="/blogs/new">
              <div className="flex">
                <div className="pr-2  text-lg font-normal text-onSecondary">
                  New
                </div>
                <FontAwesomeIcon
                  className="cursor-pointer w-7 sm:w-7 text-onSecondary"
                  icon={faCirclePlus}
                />
              </div>
            </Link>
            {/*             <Link href={`/user/${loggedInUser.user.id}/${loggedInUser.accessToken}`}>
             */}{' '}
            <Link
              href={{
                pathname: `/user/${loggedInUser.user.id}`,
                query: { token: loggedInUser.accessToken },
              }}
            >
              <button className="m-1">profile</button>
            </Link>
            <button className="m-1" onClick={() => handleLogout()}>
              Logout
            </button>
          </div>
        ) : (
          /* not logged in display */
          <div>
            <Link href={`/auth/login`}>
              <a>
                <div>Login</div>
              </a>
            </Link>
            <Link href={`/auth/signup`}>
              <a>
                <div>Signup</div>
              </a>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
