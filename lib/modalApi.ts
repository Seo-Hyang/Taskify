import axios from "axios";
import instance from "./axios";
import { headers } from "next/headers";

interface RequestOptions {
  method: string;
  headers: Record<string, string>;
  data?: string | object;
}

interface Assignee {
  nickname: string;
  profileImageUrl: string | null;
}

interface CardData {
  title: string;
  description: string;
  imageUrl: string;
  assignee: Assignee;
  dueDate: string;
}

interface Comment {
  content: string;
  cardId: string;
  columnId: string;
  dashboardId: string;
}

const fetchRequest = async (url: string, options: RequestOptions) => {
  try {
    const response = await instance(url, options);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      throw new Error(error.response.data.message || "요청에 실패했습니다.");
    } else {
      throw new Error("요청에 실패했습니다.");
    }
  }
};

// 대시보드 멤버 조회
export function getMember(dashboardId: string) {
  const url = `/members?page=1&size=20&dashboardId=${dashboardId}`;
  const options = {
    method: "GET",
    headers: {
      "Context-type": "application/json",
    },
  };
  return fetchRequest(url, options);
}

// 이미지 -> string 으로 바꾸기 - O
export function postImage(columnId: string, image: File | null) {
  const url = `/columns/${columnId}/card-image`;
  const formData = new FormData();
  if (image) {
    formData.append("image", image);
  }

  const options = {
    method: "POST",
    headers: {
      "Content-type": "multipart/form-data",
    },
    data: formData,
  };

  return fetchRequest(url, options);
}

// 카드 생성
export function postCards(title: string, description: string) {
  const url = "/cards";
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      title,
      description,
      columnId: 38487,
      dashboardId: 11388,
    },
  };
}

// 카드 상세 조회
export function getCardId(cardId: string): Promise<CardData> {
  const url = `/cards/${cardId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };
  return fetchRequest(url, options);
}

// 카드 수정
export function putCard(cardId:string){
  const url=`/cards/${cardId}`;
  const options={
    method:"PUT",
    headers:{
      "Content-type":"application/json",
    },
  };
  return fetchRequest(url,options);
}

// 카드 삭제 - O
export function deleteCard(cardId:string) {
  const url = `/cards/${cardId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  };
  return fetchRequest(url,options);
}

// 댓글 조회 - O
export function getComment(cardId: string) {
  const url = `/comments?size=10&cardId=${cardId}`;
  const options = {
    method: "GET",
    headers: {
      "Content-type": "application/json",
    },
  };
  return fetchRequest(url, options);
}

// 댓글 수정
export function putComment(commentId: string, content: string) {
  const url = `/comments/${commentId}`;
  const options = {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      content,
    },
  };
  return fetchRequest(url, options);
}

// 댓글 입력 -> 댓글 작성
export function postComment({
  content,
  cardId,
  columnId,
  dashboardId,
}: Comment) {
  const url = "/comments";
  const options = {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    data: {
      content,
      cardId,
      columnId,
      dashboardId,
    },
  };
  return fetchRequest(url, options);
}

// 댓글 삭제 - O
export function deleteComment(commentId: string) {
  const url = `/comments/${commentId}`;
  const options = {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  };
  return fetchRequest(url, options);
}
