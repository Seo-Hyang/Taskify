import ArrowButton from "@/components/Button/ArrowButton/ArrowButton";
import styles from "./index.module.scss";
import Button from "@/components/Button/Button/Button";
import PageButton from "@/components/Button/PageButton/PageButton";
import MiniPagenation from "@/components/MiniPagenation";
import MemberItem from "./MemberItem";
import mockData from "./mock.json";

const { members } = mockData;

export default function EditMemebrs() {
  return (
    <>
      <div className={styles.editMembers}>
        <div className={styles.headerWrapper}>
          <div className={styles.header}>
            <h1>구성원</h1>
            <MiniPagenation currentPage={1} totalPage={1} />
          </div>
          <h2>이름</h2>
        </div>

        <div className={styles.memberList}>
          {members.map((member) => {
            return (
              <MemberItem
                key={member.userId}
                email={member.email}
                name={member.nickname}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}
