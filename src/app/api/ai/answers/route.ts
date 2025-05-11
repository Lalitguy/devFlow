import { generateText } from "ai";
import { ValidationError } from "@/lib/https-error";
import { AIAnswerSchema } from "@/lib/validations";
import handleError from "@/lib/handlers/error";
import { NextResponse } from "next/server";
import { mistral } from "@ai-sdk/mistral";

export async function OPTIONS() {
  return NextResponse.json(
    {},
    {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST",
        "Access-Control-Allow-Headers": "*",
      },
    }
  );
}

export async function POST(req: Request) {
  const { question, content } = await req.json();

  try {
    const validatedData = AIAnswerSchema.safeParse({ question, content });

    if (!validatedData.success) {
      throw new ValidationError(validatedData.error.flatten().fieldErrors);
    }

    const { text } = await generateText({
      model: mistral("mistral-small-latest"),
      prompt: `Generate a markdown-formatted response to the following question: ${question}.  
      Base it on provided ${content}`,

      system:
        "You are a helpful assistant that provides informative responses in markdown format. Use appropriate markdown syntax for headings, lists, code blocks, and emphasis where necessary. For code blocks, use short-form smaller case language identifiers (e.g., 'js' for JavaScript, 'py' for Python, 'ts' for TypeScript, 'html' for HTML, 'css' for CSS, etc.).",
    });

    return NextResponse.json(
      { data: text, success: true },
      {
        status: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "POST",
          "Access-Control-Allow-Headers": "*",
        },
      }
    );
  } catch (err) {
    return handleError(err, "api") as ApiErrorResponse;
  }
}
