import {Github, Send} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-1">
              Pet project for personal finance management
            </p>
            <p className="text-xs text-muted-foreground">
              Created by <span className="font-medium text-foreground">@fjarrling</span> to explore modern
              web technologies
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <a
              href="https://github.com/fjarrling"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Github className="w-4 h-4"/>
              <span className="text-sm">GitHub</span>
            </a>

            <a
              href="https://t.me/fjarr"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors duration-200"
            >
              <Send className="w-4 h-4"/>
              <span className="text-sm">Telegram</span>
            </a>
          </div>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "React",
              "TypeScript",
              "Redux/Toolkit",
              "React Router",
              "React Hook From",
              "Zod",
              "Shadcn/ui",
              "Tailwind CSS"
            ].map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              © 2025 • Demo application, not for real financial data
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer
