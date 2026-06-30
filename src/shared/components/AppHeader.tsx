import { Bell, ShieldCheck } from "lucide-react";
import Button from "./ui/Button";
import SearchBar from "./ui/SearchBar";

export default function AppHeader() {
  return (
    <header className="app-header">
      <SearchBar placeholder="Pesquisar estudos, metas ou sessões" />

      <div className="app-header-actions">
        <Button variant="icon" aria-label="Notificações">
          <Bell size={18} aria-hidden="true" />
        </Button>

        <div className="profile-chip" aria-label="Perfil">
          <span className="profile-avatar">T</span>
          <div>
            <strong>Thauan</strong>
            <span>Matrix focus</span>
          </div>
          <ShieldCheck size={16} aria-hidden="true" />
        </div>
      </div>
    </header>
  );
}
