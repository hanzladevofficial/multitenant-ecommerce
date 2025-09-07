type Prop = {
  tenantName: string;
};
export function Navbar({ tenantName }: Prop) {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-screen-lg mx-auto flex gap-x-1 items-center h-full px-4 lg:px-12">
        {/* <p className="text-xl">Tenant</p>/ */}
        <p className="text-xl">{tenantName}</p>
      </div>
    </nav>
  );
}
