import ColumnAdd from "@/components/Column/ColumnAdd";
import ColumnDelete from "@/components/Column/ColumnDelete";
import ColumnEdit from "@/components/Column/ColumnEdit";
import ColumnInvite from "@/components/Column/ColumnInvite";
import MypageModal from "@/components/Column/AuthColumn/Login_Mypage";
import ToDoCreate from "@/components/Modal/ToDoCreate";
import ToDoModal from "@/components/Modal/TodoModal";
import ColumnDashboard from "@/components/Column/ColumnDashboard";

export default function ModalTest(){
    return(
        <div>
            <ToDoModal />
            <ToDoCreate />
            <ColumnAdd />
            <ColumnEdit />
            <ColumnInvite />
            <ColumnDelete />
            <MypageModal />
            <ColumnDashboard />
        </div>
    )
}