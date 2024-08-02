import ColumnAdd from "@/components/Modal/Column/ColumnAdd";
import ColumnDelete from "@/components/Modal/Column/ColumnDelete";
import ColumnEdit from "@/components/Modal/Column/ColumnEdit";
import ColumnInvite from "@/components/Modal/Column/ColumnInvite";
import MypaeModal from "@/components/Modal/MypageModal";
import ToDoCreate from "@/components/Modal/ToDoCreate";
import ToDoModal from "@/components/Modal/TodoModal";

export default function ModalTest(){
    return(
        <div>
            <ToDoModal />
            <ToDoCreate />
            <ColumnAdd />
            <ColumnEdit />
            <ColumnInvite />
            <ColumnDelete />
            <MypaeModal />
        </div>
    )
}