import {IIssue, IIssueRequestDTO, IIssuesRequestDTO} from '@src/modules/issues/models';
import axios from 'axios';
import axiosInstance from '@src/api/axios-instance';

// const generateMockIssues = (count: number): IIssue[] => {
//   const issues: IIssue[] = [];
//   for (let i = 1; i <= count; i++) {
//     issues.push({
//       url: `https://api.github.com/repos/facebook/react/issues/${i}`,
//       repository_url: "https://api.github.com/repos/facebook/react",
//       labels_url: `https://api.github.com/repos/facebook/react/issues/${i}/labels{/name}`,
//       comments_url: `https://api.github.com/repos/facebook/react/issues/${i}/comments`,
//       events_url: `https://api.github.com/repos/facebook/react/issues/${i}/events`,
//       html_url: `https://github.com/facebook/react/issues/${i}`,
//       id: 2735365580 + i, // Измените диапазон по желанию
//       node_id: `I_kwDOAJy2Ks6jCl3S_${i}`,
//       number: 31700 + i, // Измените диапазон по желанию
//       title: `[Compiler Bug]: Example issue title ${i}`,
//       user: {
//         login: `User${i}`,
//         id: 47160000 + i,
//         node_id: `MDQ6VXNlcjQ3MTYwOTk${i}`,
//         avatar_url: "https://avatars.githubusercontent.com/u/47160993?v=4",
//         gravatar_id: "",
//         url: `https://api.github.com/users/User${i}`,
//         html_url: `https://github.com/User${i}`,
//         followers_url: `https://api.github.com/users/User${i}/followers`,
//         following_url: `https://api.github.com/users/User${i}/following{/other_user}`,
//         gists_url: `https://api.github.com/users/User${i}/gists{/gist_id}`,
//         starred_url: `https://api.github.com/users/User${i}/starred{/owner}{/repo}`,
//         subscriptions_url: `https://api.github.com/users/User${i}/subscriptions`,
//         organizations_url: `https://api.github.com/users/User${i}/orgs`,
//         repos_url: `https://api.github.com/users/User${i}/repos`,
//         events_url: `https://api.github.com/users/User${i}/events{/privacy}`,
//         received_events_url: `https://api.github.com/users/User${i}/received_events`,
//         type: "User",
//         user_view_type: "public",
//         site_admin: false
//       },
//       labels: [
//         {
//           id: 40929000 + i,
//           node_id: "MDU6TGFiZWw0MDkyOTE1MQ==",
//           url: `https://api.github.com/repos/facebook/react/labels/Type:%20Bug`,
//           name: "Type: Bug",
//           color: "b60205",
//           default: false,
//           description: null
//         },
//         {
//           id: 155984000 + i,
//           node_id: "MDU6TGFiZWwxNTU5ODQxNjA=",
//           url: `https://api.github.com/repos/facebook/react/labels/Status:%20Unconfirmed`,
//           name: "Status: Unconfirmed",
//           color: "d4c5f9",
//           default: false,
//           description: "A potential issue that we haven't yet confirmed as a bug"
//         },
//         {
//           id: 180616000 + i,
//           node_id: "MDU6TGFiZWwxODA2MTYzMzA=",
//           url: `https://api.github.com/repos/facebook/react/labels/Component:%20Optimizing%20Compiler`,
//           name: "Component: Optimizing Compiler",
//           color: "bfdadc",
//           default: false,
//           description: null
//         }
//       ],
//       state: "open",
//       locked: false,
//       assignee: null,
//       assignees: [],
//       milestone: null,
//       comments: Math.floor(Math.random() * 10), // Случайное кол-во комментариев
//       created_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//       updated_at: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
//       closed_at: null,
//       author_association: "NONE",
//       active_lock_reason: null,
//       body: "### What kind of issue is this?\n\n- [X] Sample issue type\n\n### Link to repro\n\nhttps://example.com/repo\n\n### Repro steps\n\nDescribe the steps to reproduce the issue.",
//       closed_by: null,
//       reactions: {
//         url: `https://api.github.com/repos/facebook/react/issues/${i}/reactions`,
//         total_count: Math.floor(Math.random() * 10), // Случайное число реакций
//         "+1": Math.floor(Math.random() * 10),
//         "-1": Math.floor(Math.random() * 10),
//         laugh: Math.floor(Math.random() * 10),
//         hooray: Math.floor(Math.random() * 10),
//         confused: Math.floor(Math.random() * 10),
//         heart: Math.floor(Math.random() * 10),
//         rocket: Math.floor(Math.random() * 10),
//         eyes: Math.floor(Math.random() * 10)
//       },
//       timeline_url: `https://api.github.com/repos/facebook/react/issues/${i}/timeline`,
//       performed_via_github_app: null,
//       state_reason: null
//     });
//   }
//   return issues;
// };

// Имитация запроса API
// export const fetchIssuesAPI = ({userName,repoName,currentPage = 1}: IIssuesRequestDTO) => {
//   console.log('page',currentPage)
//   const mockData = generateMockIssues(500); // Генерация 500 моковых задач
//   const startIndex = (currentPage - 1) * 30;
//   const endIndex = startIndex + 30;
//
//   const paginatedData = mockData.slice(startIndex, endIndex);
//
//   return new Promise((resolve) => {
//     // Имитация задержки
//     setTimeout(() => {
//       resolve({ data: paginatedData });
//     }, 500); // Задержка 500ms для имитации запроса
//   });
// };


//
// return axios.get(`https://api.github.com/repos/${dto.userName}/${dto.repoName}/issues`, {
//   params: {
//     page: dto.currentPage
//   }
// });
export const fetchIssuesAPI = (dto: IIssuesRequestDTO) => {
  return axiosInstance.get(`/github/repos/${dto.userName}/${dto.repoName}/issues`, {
    params: {
      page: dto.currentPage
    },
  });
};

export const fetchIssueAPI = (dto: IIssueRequestDTO) => {
  return axiosInstance.get(`/github/repos/${dto.userName}/${dto.repoName}/issues/${dto.issueId}`);
}

