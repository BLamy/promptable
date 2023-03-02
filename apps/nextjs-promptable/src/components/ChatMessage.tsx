type Props = {
    msg: string;
}

export const Message = async ({ msg }: Props) => {
    
    return (
      <div className="flex items-center space-x-8 py-10 px-40 text-xl">
        <p>User: {msg}</p>
      </div>
    );
  };
  