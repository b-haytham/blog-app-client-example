import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  getUser: User;
  getLoggedInUserPosts: Array<Post>;
  getPostById: Post;
  getPublicPosts: Array<Post>;
  getPublicPostById: Post;
  getCommentsByPostId: Array<Comment>;
  getCommentById: Comment;
};


export type QueryGetUserArgs = {
  username: Scalars['String'];
};


export type QueryGetPostByIdArgs = {
  postId: Scalars['Float'];
};


export type QueryGetPublicPostByIdArgs = {
  postId: Scalars['Float'];
};


export type QueryGetCommentsByPostIdArgs = {
  postId: Scalars['Float'];
};


export type QueryGetCommentByIdArgs = {
  commentId: Scalars['Float'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  email: Scalars['String'];
  posts: Array<Post>;
  comments: Array<Comment>;
  likes: Array<Like>;
  avatar?: Maybe<Scalars['String']>;
  studied_at?: Maybe<Scalars['String']>;
  work_at?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  tweeter?: Maybe<Scalars['String']>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Post = {
  __typename?: 'Post';
  id: Scalars['ID'];
  title: Scalars['String'];
  description: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  likes: Array<Like>;
  comments: Array<Comment>;
  tags?: Maybe<Scalars['Float']>;
  published: Scalars['Boolean'];
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Like = {
  __typename?: 'Like';
  id: Scalars['ID'];
  parent: Scalars['String'];
  postId?: Maybe<Scalars['Float']>;
  commentId?: Maybe<Scalars['Float']>;
  creatorId: Scalars['Float'];
  post: Post;
  comment: Comment;
  creator: User;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  id: Scalars['ID'];
  content: Scalars['String'];
  creatorId: Scalars['Float'];
  creator: User;
  postId: Scalars['Float'];
  post: Post;
  likes: Array<Like>;
  created_at: Scalars['String'];
  updated_at: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: User;
  updateUser: User;
  signInUser: User;
  forgetPassword: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  createPost: Post;
  updatePost: Post;
  deletePost: Scalars['Boolean'];
  updateComment: Comment;
  createComment: Comment;
  deleteComment: Scalars['Boolean'];
  like: Scalars['Boolean'];
  dislike: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
  username: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  input: UpdateUserInputType;
};


export type MutationSignInUserArgs = {
  password: Scalars['String'];
  email: Scalars['String'];
};


export type MutationForgetPasswordArgs = {
  email: Scalars['String'];
};


export type MutationCreatePostArgs = {
  publish: Scalars['Boolean'];
  content: Scalars['String'];
  title: Scalars['String'];
  description: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  input: UpdatePostInputType;
  postId: Scalars['Float'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Float'];
};


export type MutationUpdateCommentArgs = {
  content: Scalars['String'];
  commentId: Scalars['Float'];
};


export type MutationCreateCommentArgs = {
  content: Scalars['String'];
  postId: Scalars['Float'];
};


export type MutationDeleteCommentArgs = {
  commentId: Scalars['Float'];
};


export type MutationLikeArgs = {
  parentId: Scalars['Float'];
  parent: Scalars['String'];
};


export type MutationDislikeArgs = {
  parentId: Scalars['Float'];
  parent: Scalars['String'];
};

export type UpdateUserInputType = {
  username: Scalars['String'];
  first_name?: Maybe<Scalars['String']>;
  last_name?: Maybe<Scalars['String']>;
  avatar?: Maybe<Scalars['String']>;
  studied_at?: Maybe<Scalars['String']>;
  work_at?: Maybe<Scalars['String']>;
  github?: Maybe<Scalars['String']>;
  facebook?: Maybe<Scalars['String']>;
  tweeter?: Maybe<Scalars['String']>;
};

export type UpdatePostInputType = {
  title: Scalars['String'];
  description: Scalars['String'];
  thumbnail?: Maybe<Scalars['String']>;
  content: Scalars['String'];
  published?: Maybe<Scalars['Boolean']>;
};

export type CreateCommentMutationVariables = Exact<{
  postId: Scalars['Float'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = (
  { __typename?: 'Mutation' }
  & { createComment: (
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'content' | 'created_at' | 'updated_at'>
  ) }
);

export type CreatePostMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  content: Scalars['String'];
  publish: Scalars['Boolean'];
}>;


export type CreatePostMutation = (
  { __typename?: 'Mutation' }
  & { createPost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'content' | 'creatorId'>
  ) }
);

export type CreateUserMutationVariables = Exact<{
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type CreateUserMutation = (
  { __typename?: 'Mutation' }
  & { createUser: (
    { __typename?: 'User' }
    & Pick<User, 'username' | 'email' | 'created_at' | 'updated_at' | 'avatar'>
  ) }
);

export type DeletePostMutationVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type DeletePostMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deletePost'>
);

export type DislikeMutationVariables = Exact<{
  parent: Scalars['String'];
  parentId: Scalars['Float'];
}>;


export type DislikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dislike'>
);

export type LikeMutationVariables = Exact<{
  parent: Scalars['String'];
  parentId: Scalars['Float'];
}>;


export type LikeMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'like'>
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type SignInMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type SignInMutation = (
  { __typename?: 'Mutation' }
  & { signInUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'first_name' | 'last_name' | 'created_at' | 'updated_at' | 'avatar' | 'studied_at' | 'work_at' | 'github' | 'facebook' | 'tweeter'>
  ) }
);

export type UpdatePostMutationVariables = Exact<{
  input: UpdatePostInputType;
  postId: Scalars['Float'];
}>;


export type UpdatePostMutation = (
  { __typename?: 'Mutation' }
  & { updatePost: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'content'>
  ) }
);

export type UpdateUserMutationVariables = Exact<{
  input: UpdateUserInputType;
}>;


export type UpdateUserMutation = (
  { __typename?: 'Mutation' }
  & { updateUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username' | 'github' | 'facebook' | 'first_name' | 'last_name'>
  ) }
);

export type GetCommentsByPostIdQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type GetCommentsByPostIdQuery = (
  { __typename?: 'Query' }
  & { getCommentsByPostId: Array<(
    { __typename?: 'Comment' }
    & Pick<Comment, 'id' | 'content' | 'created_at' | 'updated_at' | 'creatorId'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ) }
  )> }
);

export type GetLoggedInUserPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetLoggedInUserPostsQuery = (
  { __typename?: 'Query' }
  & { getLoggedInUserPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'content' | 'creatorId' | 'thumbnail' | 'tags' | 'published' | 'created_at' | 'updated_at'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'creatorId'>
    )>, likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id' | 'creatorId'>
    )> }
  )> }
);

export type GetPostByIdQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type GetPostByIdQuery = (
  { __typename?: 'Query' }
  & { getPostById: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'content' | 'thumbnail' | 'description' | 'published' | 'tags'>
  ) }
);

export type GetPublicPostByIdQueryVariables = Exact<{
  postId: Scalars['Float'];
}>;


export type GetPublicPostByIdQuery = (
  { __typename?: 'Query' }
  & { getPublicPostById: (
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'thumbnail' | 'content' | 'tags' | 'created_at' | 'updated_at'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'created_at' | 'creatorId'>
      & { likes: Array<(
        { __typename?: 'Like' }
        & Pick<Like, 'id'>
      )> }
    )> }
  ) }
);

export type GetPublicPostsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetPublicPostsQuery = (
  { __typename?: 'Query' }
  & { getPublicPosts: Array<(
    { __typename?: 'Post' }
    & Pick<Post, 'id' | 'title' | 'description' | 'content' | 'creatorId' | 'thumbnail' | 'tags' | 'published' | 'created_at' | 'updated_at'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username' | 'avatar'>
    ), comments: Array<(
      { __typename?: 'Comment' }
      & Pick<Comment, 'id' | 'content' | 'creatorId'>
    )>, likes: Array<(
      { __typename?: 'Like' }
      & Pick<Like, 'id' | 'creatorId'>
    )> }
  )> }
);

export type GetUserByUsernameQueryVariables = Exact<{
  username: Scalars['String'];
}>;


export type GetUserByUsernameQuery = (
  { __typename?: 'Query' }
  & { getUser: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'avatar' | 'username' | 'studied_at' | 'work_at' | 'github' | 'facebook' | 'tweeter' | 'created_at'>
    & { posts: Array<(
      { __typename?: 'Post' }
      & Pick<Post, 'id' | 'title' | 'tags' | 'description' | 'created_at'>
    )> }
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'email' | 'username' | 'first_name' | 'last_name' | 'created_at' | 'updated_at' | 'avatar' | 'studied_at' | 'work_at' | 'github' | 'facebook' | 'tweeter'>
  )> }
);


export const CreateCommentDocument = gql`
    mutation createComment($postId: Float!, $content: String!) {
  createComment(content: $content, postId: $postId) {
    id
    content
    created_at
    updated_at
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, baseOptions);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreatePostDocument = gql`
    mutation createPost($title: String!, $description: String!, $content: String!, $publish: Boolean!) {
  createPost(title: $title, description: $description, content: $content, publish: $publish) {
    id
    title
    description
    content
    creatorId
  }
}
    `;
export type CreatePostMutationFn = Apollo.MutationFunction<CreatePostMutation, CreatePostMutationVariables>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      content: // value for 'content'
 *      publish: // value for 'publish'
 *   },
 * });
 */
export function useCreatePostMutation(baseOptions?: Apollo.MutationHookOptions<CreatePostMutation, CreatePostMutationVariables>) {
        return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(CreatePostDocument, baseOptions);
      }
export type CreatePostMutationHookResult = ReturnType<typeof useCreatePostMutation>;
export type CreatePostMutationResult = Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<CreatePostMutation, CreatePostMutationVariables>;
export const CreateUserDocument = gql`
    mutation createUser($username: String!, $email: String!, $password: String!) {
  createUser(username: $username, email: $email, password: $password) {
    username
    email
    created_at
    updated_at
    avatar
  }
}
    `;
export type CreateUserMutationFn = Apollo.MutationFunction<CreateUserMutation, CreateUserMutationVariables>;

/**
 * __useCreateUserMutation__
 *
 * To run a mutation, you first call `useCreateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUserMutation, { data, loading, error }] = useCreateUserMutation({
 *   variables: {
 *      username: // value for 'username'
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useCreateUserMutation(baseOptions?: Apollo.MutationHookOptions<CreateUserMutation, CreateUserMutationVariables>) {
        return Apollo.useMutation<CreateUserMutation, CreateUserMutationVariables>(CreateUserDocument, baseOptions);
      }
export type CreateUserMutationHookResult = ReturnType<typeof useCreateUserMutation>;
export type CreateUserMutationResult = Apollo.MutationResult<CreateUserMutation>;
export type CreateUserMutationOptions = Apollo.BaseMutationOptions<CreateUserMutation, CreateUserMutationVariables>;
export const DeletePostDocument = gql`
    mutation deletePost($postId: Float!) {
  deletePost(postId: $postId)
}
    `;
export type DeletePostMutationFn = Apollo.MutationFunction<DeletePostMutation, DeletePostMutationVariables>;

/**
 * __useDeletePostMutation__
 *
 * To run a mutation, you first call `useDeletePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePostMutation, { data, loading, error }] = useDeletePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useDeletePostMutation(baseOptions?: Apollo.MutationHookOptions<DeletePostMutation, DeletePostMutationVariables>) {
        return Apollo.useMutation<DeletePostMutation, DeletePostMutationVariables>(DeletePostDocument, baseOptions);
      }
export type DeletePostMutationHookResult = ReturnType<typeof useDeletePostMutation>;
export type DeletePostMutationResult = Apollo.MutationResult<DeletePostMutation>;
export type DeletePostMutationOptions = Apollo.BaseMutationOptions<DeletePostMutation, DeletePostMutationVariables>;
export const DislikeDocument = gql`
    mutation dislike($parent: String!, $parentId: Float!) {
  dislike(parent: $parent, parentId: $parentId)
}
    `;
export type DislikeMutationFn = Apollo.MutationFunction<DislikeMutation, DislikeMutationVariables>;

/**
 * __useDislikeMutation__
 *
 * To run a mutation, you first call `useDislikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeMutation, { data, loading, error }] = useDislikeMutation({
 *   variables: {
 *      parent: // value for 'parent'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useDislikeMutation(baseOptions?: Apollo.MutationHookOptions<DislikeMutation, DislikeMutationVariables>) {
        return Apollo.useMutation<DislikeMutation, DislikeMutationVariables>(DislikeDocument, baseOptions);
      }
export type DislikeMutationHookResult = ReturnType<typeof useDislikeMutation>;
export type DislikeMutationResult = Apollo.MutationResult<DislikeMutation>;
export type DislikeMutationOptions = Apollo.BaseMutationOptions<DislikeMutation, DislikeMutationVariables>;
export const LikeDocument = gql`
    mutation like($parent: String!, $parentId: Float!) {
  like(parent: $parent, parentId: $parentId)
}
    `;
export type LikeMutationFn = Apollo.MutationFunction<LikeMutation, LikeMutationVariables>;

/**
 * __useLikeMutation__
 *
 * To run a mutation, you first call `useLikeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeMutation, { data, loading, error }] = useLikeMutation({
 *   variables: {
 *      parent: // value for 'parent'
 *      parentId: // value for 'parentId'
 *   },
 * });
 */
export function useLikeMutation(baseOptions?: Apollo.MutationHookOptions<LikeMutation, LikeMutationVariables>) {
        return Apollo.useMutation<LikeMutation, LikeMutationVariables>(LikeDocument, baseOptions);
      }
export type LikeMutationHookResult = ReturnType<typeof useLikeMutation>;
export type LikeMutationResult = Apollo.MutationResult<LikeMutation>;
export type LikeMutationOptions = Apollo.BaseMutationOptions<LikeMutation, LikeMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const SignInDocument = gql`
    mutation signIn($email: String!, $password: String!) {
  signInUser(email: $email, password: $password) {
    id
    email
    username
    first_name
    last_name
    created_at
    updated_at
    avatar
    studied_at
    work_at
    github
    facebook
    tweeter
  }
}
    `;
export type SignInMutationFn = Apollo.MutationFunction<SignInMutation, SignInMutationVariables>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(baseOptions?: Apollo.MutationHookOptions<SignInMutation, SignInMutationVariables>) {
        return Apollo.useMutation<SignInMutation, SignInMutationVariables>(SignInDocument, baseOptions);
      }
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult = Apollo.MutationResult<SignInMutation>;
export type SignInMutationOptions = Apollo.BaseMutationOptions<SignInMutation, SignInMutationVariables>;
export const UpdatePostDocument = gql`
    mutation updatePost($input: UpdatePostInputType!, $postId: Float!) {
  updatePost(postId: $postId, input: $input) {
    id
    title
    description
    content
  }
}
    `;
export type UpdatePostMutationFn = Apollo.MutationFunction<UpdatePostMutation, UpdatePostMutationVariables>;

/**
 * __useUpdatePostMutation__
 *
 * To run a mutation, you first call `useUpdatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePostMutation, { data, loading, error }] = useUpdatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useUpdatePostMutation(baseOptions?: Apollo.MutationHookOptions<UpdatePostMutation, UpdatePostMutationVariables>) {
        return Apollo.useMutation<UpdatePostMutation, UpdatePostMutationVariables>(UpdatePostDocument, baseOptions);
      }
export type UpdatePostMutationHookResult = ReturnType<typeof useUpdatePostMutation>;
export type UpdatePostMutationResult = Apollo.MutationResult<UpdatePostMutation>;
export type UpdatePostMutationOptions = Apollo.BaseMutationOptions<UpdatePostMutation, UpdatePostMutationVariables>;
export const UpdateUserDocument = gql`
    mutation updateUser($input: UpdateUserInputType!) {
  updateUser(input: $input) {
    id
    username
    github
    facebook
    first_name
    last_name
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, baseOptions);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const GetCommentsByPostIdDocument = gql`
    query getCommentsByPostId($postId: Float!) {
  getCommentsByPostId(postId: $postId) {
    id
    content
    created_at
    updated_at
    creatorId
    creator {
      id
      username
      avatar
    }
  }
}
    `;

/**
 * __useGetCommentsByPostIdQuery__
 *
 * To run a query within a React component, call `useGetCommentsByPostIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsByPostIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsByPostIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetCommentsByPostIdQuery(baseOptions?: Apollo.QueryHookOptions<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>) {
        return Apollo.useQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, baseOptions);
      }
export function useGetCommentsByPostIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>) {
          return Apollo.useLazyQuery<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>(GetCommentsByPostIdDocument, baseOptions);
        }
export type GetCommentsByPostIdQueryHookResult = ReturnType<typeof useGetCommentsByPostIdQuery>;
export type GetCommentsByPostIdLazyQueryHookResult = ReturnType<typeof useGetCommentsByPostIdLazyQuery>;
export type GetCommentsByPostIdQueryResult = Apollo.QueryResult<GetCommentsByPostIdQuery, GetCommentsByPostIdQueryVariables>;
export const GetLoggedInUserPostsDocument = gql`
    query getLoggedInUserPosts {
  getLoggedInUserPosts {
    id
    title
    description
    content
    creatorId
    creator {
      id
      username
      avatar
    }
    comments {
      id
      content
      creatorId
    }
    likes {
      id
      creatorId
    }
    thumbnail
    tags
    published
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetLoggedInUserPostsQuery__
 *
 * To run a query within a React component, call `useGetLoggedInUserPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLoggedInUserPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLoggedInUserPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetLoggedInUserPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetLoggedInUserPostsQuery, GetLoggedInUserPostsQueryVariables>) {
        return Apollo.useQuery<GetLoggedInUserPostsQuery, GetLoggedInUserPostsQueryVariables>(GetLoggedInUserPostsDocument, baseOptions);
      }
export function useGetLoggedInUserPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLoggedInUserPostsQuery, GetLoggedInUserPostsQueryVariables>) {
          return Apollo.useLazyQuery<GetLoggedInUserPostsQuery, GetLoggedInUserPostsQueryVariables>(GetLoggedInUserPostsDocument, baseOptions);
        }
export type GetLoggedInUserPostsQueryHookResult = ReturnType<typeof useGetLoggedInUserPostsQuery>;
export type GetLoggedInUserPostsLazyQueryHookResult = ReturnType<typeof useGetLoggedInUserPostsLazyQuery>;
export type GetLoggedInUserPostsQueryResult = Apollo.QueryResult<GetLoggedInUserPostsQuery, GetLoggedInUserPostsQueryVariables>;
export const GetPostByIdDocument = gql`
    query getPostById($postId: Float!) {
  getPostById(postId: $postId) {
    id
    title
    content
    thumbnail
    description
    published
    tags
  }
}
    `;

/**
 * __useGetPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPostByIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPostByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
        return Apollo.useQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, baseOptions);
      }
export function useGetPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPostByIdQuery, GetPostByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPostByIdQuery, GetPostByIdQueryVariables>(GetPostByIdDocument, baseOptions);
        }
export type GetPostByIdQueryHookResult = ReturnType<typeof useGetPostByIdQuery>;
export type GetPostByIdLazyQueryHookResult = ReturnType<typeof useGetPostByIdLazyQuery>;
export type GetPostByIdQueryResult = Apollo.QueryResult<GetPostByIdQuery, GetPostByIdQueryVariables>;
export const GetPublicPostByIdDocument = gql`
    query getPublicPostById($postId: Float!) {
  getPublicPostById(postId: $postId) {
    id
    title
    description
    thumbnail
    content
    tags
    created_at
    updated_at
    creator {
      id
      username
      avatar
    }
    comments {
      id
      content
      created_at
      creatorId
      likes {
        id
      }
    }
  }
}
    `;

/**
 * __useGetPublicPostByIdQuery__
 *
 * To run a query within a React component, call `useGetPublicPostByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicPostByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicPostByIdQuery({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useGetPublicPostByIdQuery(baseOptions?: Apollo.QueryHookOptions<GetPublicPostByIdQuery, GetPublicPostByIdQueryVariables>) {
        return Apollo.useQuery<GetPublicPostByIdQuery, GetPublicPostByIdQueryVariables>(GetPublicPostByIdDocument, baseOptions);
      }
export function useGetPublicPostByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicPostByIdQuery, GetPublicPostByIdQueryVariables>) {
          return Apollo.useLazyQuery<GetPublicPostByIdQuery, GetPublicPostByIdQueryVariables>(GetPublicPostByIdDocument, baseOptions);
        }
export type GetPublicPostByIdQueryHookResult = ReturnType<typeof useGetPublicPostByIdQuery>;
export type GetPublicPostByIdLazyQueryHookResult = ReturnType<typeof useGetPublicPostByIdLazyQuery>;
export type GetPublicPostByIdQueryResult = Apollo.QueryResult<GetPublicPostByIdQuery, GetPublicPostByIdQueryVariables>;
export const GetPublicPostsDocument = gql`
    query getPublicPosts {
  getPublicPosts {
    id
    title
    description
    content
    creatorId
    creator {
      id
      username
      avatar
    }
    comments {
      id
      content
      creatorId
    }
    likes {
      id
      creatorId
    }
    thumbnail
    tags
    published
    created_at
    updated_at
  }
}
    `;

/**
 * __useGetPublicPostsQuery__
 *
 * To run a query within a React component, call `useGetPublicPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetPublicPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetPublicPostsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetPublicPostsQuery(baseOptions?: Apollo.QueryHookOptions<GetPublicPostsQuery, GetPublicPostsQueryVariables>) {
        return Apollo.useQuery<GetPublicPostsQuery, GetPublicPostsQueryVariables>(GetPublicPostsDocument, baseOptions);
      }
export function useGetPublicPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetPublicPostsQuery, GetPublicPostsQueryVariables>) {
          return Apollo.useLazyQuery<GetPublicPostsQuery, GetPublicPostsQueryVariables>(GetPublicPostsDocument, baseOptions);
        }
export type GetPublicPostsQueryHookResult = ReturnType<typeof useGetPublicPostsQuery>;
export type GetPublicPostsLazyQueryHookResult = ReturnType<typeof useGetPublicPostsLazyQuery>;
export type GetPublicPostsQueryResult = Apollo.QueryResult<GetPublicPostsQuery, GetPublicPostsQueryVariables>;
export const GetUserByUsernameDocument = gql`
    query getUserByUsername($username: String!) {
  getUser(username: $username) {
    id
    email
    avatar
    username
    studied_at
    work_at
    github
    facebook
    tweeter
    created_at
    posts {
      id
      title
      tags
      description
      created_at
    }
  }
}
    `;

/**
 * __useGetUserByUsernameQuery__
 *
 * To run a query within a React component, call `useGetUserByUsernameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByUsernameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByUsernameQuery({
 *   variables: {
 *      username: // value for 'username'
 *   },
 * });
 */
export function useGetUserByUsernameQuery(baseOptions?: Apollo.QueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
        return Apollo.useQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, baseOptions);
      }
export function useGetUserByUsernameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>) {
          return Apollo.useLazyQuery<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>(GetUserByUsernameDocument, baseOptions);
        }
export type GetUserByUsernameQueryHookResult = ReturnType<typeof useGetUserByUsernameQuery>;
export type GetUserByUsernameLazyQueryHookResult = ReturnType<typeof useGetUserByUsernameLazyQuery>;
export type GetUserByUsernameQueryResult = Apollo.QueryResult<GetUserByUsernameQuery, GetUserByUsernameQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    email
    username
    first_name
    last_name
    created_at
    updated_at
    avatar
    studied_at
    work_at
    github
    facebook
    tweeter
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;