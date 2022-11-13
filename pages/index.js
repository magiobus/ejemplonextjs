import MainLayout from "../components/layouts/MainLayout";

const HomePage = () => {
  return (
    <MainLayout>
      <div className="container flex justify-center items-center">
        <h1 className="text-3xl text-yellow-400 bg-black px-2">
          Bienvenido al nuevo universo de magiosito3.0 🐻
        </h1>
      </div>
    </MainLayout>
  );
};

export default HomePage;
