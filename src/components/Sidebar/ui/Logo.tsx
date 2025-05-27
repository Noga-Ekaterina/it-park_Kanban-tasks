import logoIcon from "@/assets/logo-mobile.svg";

export function Logo() {
  return (
    <div className="logo">
      <img src={logoIcon} alt="Logo" />
      <h1>Kanban</h1>
    </div>
  );
}
