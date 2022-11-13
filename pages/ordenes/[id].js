import axios from "axios";
import toast from "react-hot-toast";
import MainLayout from "../../components/layouts/MainLayout";

//this runs on frontend
const OrdenesView = ({ id }) => {
  const handleClick = async () => {
    //post next api

    try {
      const response = await axios.post("/api/test", { id });
      toast.success("Todo Bonito");
    } catch (error) {
      toast.error("Todo Mal");
    }
  };

  return (
    <MainLayout>
      <div className="w-full flex items-center justify-center h-screen">
        <button
          onClick={() => handleClick()}
          className="bg-black text-white px-4 py-2 rounded-md"
        >
          Pegale al api{" "}
        </button>
      </div>
    </MainLayout>
  );
};

export default OrdenesView;

//this runs on backend
export async function getServerSideProps(context) {
  const { id } = context.params;
  console.log(id);
  return {
    props: {
      id: id,
    }, // will be passed to the page component as props
  };
}
